const router = require("express").Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { validate, Patient } = require("../models/patient");
const { Test } = require("../models/tests");
const { Package } = require("../models/packages");
const { Client } = require("../models/client")

// Create a new patient
router.post("/", auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const client = await Client.findById(req.body.client);

    const tests = req.body.tests.map((test) => test.test);
    const testDocuments = await Test.find({ _id: { $in: tests } });

    const testPrices = testDocuments.reduce((acc, test) => {
      acc[test._id.toString()] = test.mrp;
      
      return acc;
    }, {});

    let totalPackageCost = 0;

    if (req.body.packages && Array.isArray(req.body.packages ) && req.body.packages.every(
      pkg => pkg.package && typeof pkg.package === "string" && pkg.package.trim().length > 0
    )) {
      const packages = req.body.packages.map((pkg) => pkg.package);
      const packageDocuments = await Package.find({ _id: { $in: packages } });

      const packagePrices = packageDocuments.reduce((acc, pkg) => {
        acc[pkg._id.toString()] = pkg.mrp;
        return acc;
      }, {});

      totalPackageCost = req.body.packages.reduce((acc, pkg) => {
        const pkgId = pkg.package.toString();
        return acc + (packagePrices[pkgId] || 0);
      }, 0);
    }

    const totalTestCost = req.body.tests.reduce((acc, test) => {
      const testId = test.test.toString();
      return acc + (testPrices[testId] || 0);
    }, 0);
    

    
    const totalCost = totalTestCost + totalPackageCost;

    if (client.currentBalance < totalCost) {
      return res.status(400).send({message:"Not enough balance to Book the Tests"});
    }

    const patient = new Patient({ ...req.body, client: client._id, totalCost });

    const prevTotalCost = client.totalCost || 0;
    const currentBalance = client.currentBalance || 0;
    const newTotalCost = prevTotalCost + patient.totalCost;
    const newCurrentBalance = currentBalance - patient.totalCost;

    client.totalCost = newTotalCost;
    client.currentBalance = newCurrentBalance;
    await patient.save();

    // Add patient to the client's patients array
    client.patients.push(patient._id);
    
    await client.save();

    res.status(200).send({ data: patient, message: "Booked Tests successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});




//edit the patient Details
router.put("/edit/:id", [validateObjectId, auth], async (req, res) => {
  try {
    const client = await Client.findById(req.user._id);

    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(400).send({ message: "Patient does not exist" });
    }

    // Check if the client is authorized to edit the patient
    if (!req.user.isAdmin && patient.client.toString() !== req.user._id) {
      return res.status(403).send({ message: "You are not authorized to edit this patient" });
    }

    const currentDate = new Date();
    const creationDate = new Date(patient.dateOfCreation);

    // Check if the editing is within ten days of the creation date
    const tenDaysAgo = new Date(creationDate.setDate(creationDate.getDate() + 10));
    if (currentDate > tenDaysAgo ) {
      return res.status(403).send({ message: "You cannot edit now. It has been more than ten days since the patient was created." });
    }

    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    await updatedPatient.save();

    res
      .status(200)
      .send({ data: updatedPatient, message: "Patient details updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});



//Edit the patient Details by Admin Only.
router.patch("/editByAdmin/:id", [ admin], async (req, res) => {
  try {
    const patients = await Patient.findById(req.params.id);

    if (!patients) {
      return res.status(400).send({ message: "Patient does not exist" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    await updatedPatient.save();

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

    const patient = await Patient.findById(id);

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

    const patient = await Patient.findById(id);

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






//get individual client patients by their resp.Clients only

router.get('/allPatients', [auth], async (req, res) => {
    try {
      const client = await Client.findById(req.user._id);
  
      if (!client) {
        return res.status(404).send({ message: 'Client not found' });
      }
  
      const patients = await Patient.find({ client: req.user._id }).select('-__v');
  
      const transformedPatients = await Promise.all(
        patients.map(async (patient) => {
          const testNames = await Promise.all(
            patient.tests.map(async (test) => {
              const testObj = await Test.findById(test.test);
              const statusObj = test.status;
              const status = statusObj ? statusObj.status : null;
              const repeatReason =statusObj.repeatReason || '';
              return testObj ? { test: testObj.testName, status,mrp:testObj.mrp,repeatReason } : null;
            })
          );
  
          const packageNames = await Promise.all(
            patient.packages.map(async (package) => {
              const packageObj = await Package.findById(package.package);
              const statusObj = package.status;
              const status = statusObj ? statusObj.status : null;
              const repeatReason =statusObj.repeatReason || '';

              return packageObj ? { package: packageObj.packageName, status,mrp:packageObj.mrp,repeatReason } : null;
            })
          );
          const report = patient.report || ''
  
          return {
            _id: patient._id,
            client: patient.client,
            patientName: patient.patientName,
            age: patient.age,
            gender: patient.gender,
            mobileNumber: patient.mobileNumber,
            tests: testNames.filter(Boolean),
            packages: packageNames.filter(Boolean),
            totalCost:patient.totalCost,
            report:report,
            dateOfCreation: patient.dateOfCreation,
          };
        })
      );
  
      res.status(200).send({ data: transformedPatients });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  
  
  
  

//get all Patients to Admin Only

  router.get('/', [admin], async (req, res) => {
    try {
      const patients = await Patient.find().select('-__v');
      const patientData = [];
  
      for (const patient of patients) {
        const client = await Client.findById(patient.client).select('name');
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
          clientName: client.name,
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
  

//Add-ons tests and packages
router.put('/add-ons/:id', [validateObjectId, auth], async (req, res) => {
  try {
    const { tests, packages } = req.body;

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }

    const currentDate = new Date();
    const creationDate = new Date(patient.dateOfCreation);

    // Check if adding tests/packages is within ten days of creation
    const tenDaysAgo = new Date(creationDate.setDate(creationDate.getDate() + 10));
    if (currentDate > tenDaysAgo) {
      return res.status(403).send({ message: 'You cannot add tests/packages now. It has been more than ten days since the patient was created.' });
    }

    // Add tests to the patient
    if (tests && Array.isArray(tests)) {
      const testsToAdd = await Test.find({ _id: { $in: tests } });

      testsToAdd.forEach((test) => {
        patient.tests.push({ test: test._id });
        patient.totalCost += test.mrp; // Add test MRP to total cost
      });
    }

    // Add packages to the patient
    if (packages && Array.isArray(packages)) {
      const packagesToAdd = await Package.find({ _id: { $in: packages } });

      packagesToAdd.forEach((pkg) => {
        patient.packages.push({ package: pkg._id });
        patient.totalCost += pkg.mrp; // Add package MRP to total cost
      });
    }

    const client = await Client.findById(patient.client);

    if (!client) {
      return res.status(404).send({ message: 'Client not found' });
    }

    const newCurrentBalance = client.currentBalance - patient.totalCost;
    client.currentBalance = newCurrentBalance;

    await Promise.all([patient.save(), client.save()]);

    res.status(200).send({ data: patient, message: 'Tests and packages added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});





// remove the patient data by only Admin or Client
router.delete("/:id", [validateObjectId, admin], async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    }
  
    await patient.findByIdAndRemove(req.params.id);
    res.status(200).send({ message: "Patient data deleted successfully" });
  });
  
// Update test status for a patient by admin
router.put("/update-test-status/:patientId/:testId", [auth, admin], async (req, res) => {
  try {
    const { patientId, testId } = req.params;
    const { status,repeatReason} = req.body;
   
    const patient = await Patient.findById({ _id: patientId, client: req.client._id });
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    }
    
    const test = patient.tests.find((t) => t._id.toString() === testId);
    if (!test) {
      return res.status(404).send({ message: "Test not found" });
    }

    // Update the status of the test
    test.status.status = status;
    test.status.recordDate = new Date(); 
    test.status.repeatReason= repeatReason// Set the current date and time
    
    await patient.save();

    res.status(200).send({ message: "Test status updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});


// Get test status for a patient by client
router.get("/test-status/:patientId/:testId", auth, async (req, res) => {
  try {
    const { patientId, testId } = req.params;

    const patient = await Patient.findOne({ _id: patientId, client: req.user._id });
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    }
    console.log(patient.tests[0]._id.toString())
    const test = patient.tests.find((t) => t._id.toString() === testId);
    
    if (!test) {
      return res.status(404).send({ message: "Test not found" });
    }

    const status = test.status;

    res.status(200).send({ status });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});


// Update package status for a patient by admin
router.put("/update-package-status/:patientId/:packageId", [auth, admin], async (req, res) => {
  try {
    const { patientId, packageId } = req.params;
    const { status,repeatReason} = req.body;

    const patient = await Patient.findById({ _id: patientId, client: req.user._id });
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    }

    const package = patient.packages.find((p) => p._id.toString() === packageId);
    if (!package) {
      return res.status(404).send({ message: "Package not found" });
    }

    // Update the status of the package
    package.status.status = status;
    package.status.recordDate = new Date();
    package.status.repeatReason=repeatReason; // Set the current date and time

    await patient.save();

    res.status(200).send({ message: "Package status updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});


// Get package status for a patient by client
router.get("/package-status/:patientId/:packageId", auth, async (req, res) => {
  try {
    const { patientId, packageId } = req.params;

    const patient = await Patient.findOne({ _id: patientId, client: req.user._id });
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    }

    const package = patient.packages.find((p) => p._id.toString() === packageId);
    if (!package) {
      return res.status(404).send({ message: "Package not found" });
    }

    const status = package.status;

    res.status(200).send({ status });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});



  
module.exports = router;