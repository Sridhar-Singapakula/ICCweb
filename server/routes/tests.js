const router = require("express").Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { patient } = require("../models/patient");
const { Test,validate} = require("../models/tests");
const {Client} = require("../models/client")

// Create a new test
router.post('/',admin, async (req, res) => {
  try {
    const schema = Joi.object({
      testName: Joi.string().required(),
      mrp: Joi.number().required(),
      sampleType: Joi.string().required(),
      collectionTube: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const newTest = new Test({
      testName: req.body.testName,
      mrp: req.body.mrp,
      sampleType: req.body.sampleType,
      collectionTube:req.body.collectionTube
    });

    await newTest.save();

    res.status(201).send({ data: newTest, message: 'Test created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all tests
router.get('/',async (req, res) => {
  try {
    const tests = await Test.find();

    res.status(200).send({ data: tests });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
//edit test details
router.put('/:id', [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;
    const { testName, mrp, sampleType, collectionTube } = req.body;

    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).send({ message: 'Test not found' });
    }

    // Update the test details if provided
    if (testName) {
      test.testName = testName;
    }
    if (mrp) {
      test.mrp = mrp;
    }
    if (sampleType) {
      test.sampleType = sampleType;
    }
    if (collectionTube) {
      test.collectionTube = collectionTube;
    }

    // Save the updated test
    await test.save();

    res.status(200).send({ data: test, message: 'Test details updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


// Delete a test
router.delete('/:id',[validateObjectId,admin], async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTest = await Test.findByIdAndDelete(id);

    if (!deletedTest) {
      return res.status(404).send({ message: 'Test not found' });
    }

    res.status(200).send({ message: 'Test deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
// Get a specific test
router.get('/:id', [validateObjectId, auth], async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Invalid test ID' });
    }

    const test = await Test.findById(id);

    if (!test) {
      return res.status(404).send({ message: 'Test not found' });
    }

    res.status(200).send({ data: test });
  } catch (error) {
    console.error(error.message);
     return res.status(500).send({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
