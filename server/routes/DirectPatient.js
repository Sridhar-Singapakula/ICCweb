const router = require("express").Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const {validate,directPatient}=require("../models/directPatient")
const { Test } = require("../models/tests");
const { Package } = require("../models/packages");
const sendEmail = require("../utils/sendEmail");
const Razorpay = require('razorpay');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");


// Create a new patient and process payment
router.post("/order", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const instance = new Razorpay({
          key_id: process.env.KEY_ID,
          key_secret: process.env.KEY_SECRET,
        });
      
        const { tests, packages } = req.body;
        console.log(("tests, packages"))
        const testsIds = tests.map((test) => test.test);
        const testDocuments = await Test.find({ _id: { $in: testsIds } });
        const testPrices = testDocuments.reduce((acc, test) => {
            acc[test._id.toString()] = test.mrp;
            return acc;
        }, {});
        const totalTestCost = tests.reduce((acc, test) => {
            const testId = test.test.toString();
            return acc + (testPrices[testId] || 0);
        }, 0);

        let totalPackageCost = 0;
        if (
            packages &&
            Array.isArray(packages) &&
            packages.every(
                (pkg) =>
                    pkg.package &&
                    typeof pkg.package === "string" &&
                    pkg.package.trim().length > 0
            )
        ) {
            const packageIds = packages.map((pkg) => pkg.package);
            const packageDocuments = await Package.find({ _id: { $in: packageIds } });
            const packagePrices = packageDocuments.reduce((acc, pkg) => {
                acc[pkg._id.toString()] = pkg.mrp;
                return acc;
            }, {});
            totalPackageCost = packages.reduce((acc, pkg) => {
                const packageId = pkg.package.toString();
                return acc + (packagePrices[packageId] || 0);
            }, 0);
        }

        const totalCost = totalTestCost + totalPackageCost;
        // Create payment order
        const options = {
            amount: totalCost * 100, // Convert to paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, async (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something went wrong!" });
            }
            res.status(200).json({data:order,amount:totalCost})
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});


router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response;
    const sign = razorpay_order_id + "|" + razorpay_payment_id ;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSignature) {
      const { patientName, age, gender, emailId,tests,packages,mobileNumber,totalCost,address } = req.body;
      // Create the new patient entry using the patient information
      const newPatient = new directPatient({
        patientName,
        age,
        gender,
        emailId,
        tests,
        packages,
        mobileNumber,
        totalCost,
        address
        // Add other required fields from req.body as needed
      });

      // Save the patient entry
      await newPatient.save();

      // Send payment details and patient data via email
      const emailText = `Payment Details:\nOrder ID: ${razorpay_order_id}\nPayment ID: ${razorpay_payment_id}\n\nPatient Data:\n${JSON.stringify(req.body, null, 2)}`;
      await sendEmail(emailId, "Payment and Patient Details", emailText);

      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

  
  // Get all queries
  router.get('/',admin,async (req, res) => {
    try {
      const patients = await directPatient.find();
      const patientData = [];
      for (const patient of patients) {
        const tests = [];
  
        for (const test of patient.tests) {
          const testInfo = await Test.findById(test.test).select('testName');
          const status = {
            status: test.status.status,
            repeatReason: test.status.repeatReason,
            recordDate: test.status.recordDate
          };
  
          const testWithStatus = {
            testId: test.test,
            testName: testInfo.testName,
            status
          };
  
          tests.push(testWithStatus);
        }
  
        const packages = [];
        if (patient.packages && patient.packages.length > 0) {
          for (const pack of patient.packages) {
            const packageInfo = await Package.findById(pack.package).select('packageName');
            if (packageInfo) {
              const status = {
                status: pack.status.status,
                repeatReason: pack.status.repeatReason,
                recordDate: pack.status.recordDate
              };

              const packageWithStatus = {
                packageId: pack.package,
                packageName: packageInfo.packageName,
                status
              };
              packages.push(packageWithStatus);
            }
          }
        }
  
        const patientWithClient = {
          _id: patient._id,
          patientName: patient.patientName,
          gender: patient.gender,
          mobileNumber: patient.mobileNumber,
          tests,
          packages,
          dateOfCreation: patient.dateOfCreation,
          age: patient.age,
          totalCost: patient.totalCost
        };
  
        patientData.push(patientWithClient);
      }
  
      res.status(200).send({ data: patientData });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });


  //Edit the patient Details by Admin Only.
router.patch("/editByAdmin/:id", admin, async (req, res) => {
  try {
    const patients = await directPatient.findById(req.params.id);

    if (!patients) {
      return res.status(400).send({ message: "Patient does not exist" });
    }

    const updatedPatient = await directPatient.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    await updatedPatient.save();
    await sendEmail(patients.emailId,"Download Your Report",updatedPatient.report)

    res
      .status(200)
      .send({ data: updatedPatient, message: "Patient details updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});



// Update Test Status by admin
router.put("/updateTestStatus/:id", [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;
    const { testId, status } = req.body;

    const patient = await directPatient.findById(id);

    if (!patient) {
      return res.status(400).send({ message: "Patient does not exist" });
    }

    // Find the test in the patient's tests array
    const testIndex = patient.tests.findIndex((test) => test.test.toString() === testId);

    if (testIndex === -1) {
      return res.status(400).send({ message: "Test does not exist for the patient" });
    }

    // Update the test status
    patient.tests[testIndex].status.status = status;

    // Save the updated patient data
    const updatedPatient = await patient.save();

    res.status(200).send({ data: updatedPatient, message: "Test status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Update Test Status by admin
router.put("/updatePackageStatus/:id", [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;
    const { packageId, status } = req.body;

    const patient = await directPatient.findById(id);

    if (!patient) {
      return res.status(400).send({ message: "Patient does not exist" });
    }

    // Find the test in the patient's tests array
    const packageIndex = patient.packages.findIndex((p) => p.package.toString() === packageId);

    if (packageIndex === -1) {
      return res.status(400).send({ message: "Test does not exist for the patient" });
    }

    // Update the test status
    patient.packages[testIndex].status.status = status;

    // Save the updated patient data
    const updatedPatient = await patient.save();

    res.status(200).send({ data: updatedPatient, message: "Test status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


  module.exports = router;
