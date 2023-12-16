const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const {
  GroupGCNamePerformance,
  validateGroupNamePerformance
} = require("../models/GroupGCNameRankings");

// Create a new GroupGCNamePerformance
router.post('/', async (req, res) => {
  try {
    const { error } = validateGroupNamePerformance(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const newGroupGCNamePerformance = new GroupGCNamePerformance({
      name: req.body.name,
      participants: req.body.participants,
    });

    await newGroupGCNamePerformance.save();

    res.status(201).send({ data: newGroupGCNamePerformance, message: 'GroupGCNamePerformance added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all GroupGCNamePerformance
router.get('/', async (req, res) => {
  try {
    const groupGCNamePerformances = await GroupGCNamePerformance.find();
    res.status(200).send({ data: groupGCNamePerformances });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Edit GroupGCNamePerformance details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const groupGCNamePerformance = await GroupGCNamePerformance.findByIdAndUpdate(id, req.body, { new: true });
    if (!groupGCNamePerformance) {
      return res.status(404).send({ message: 'GroupGCNamePerformance not found' });
    }

    res.status(200).send({ data: groupGCNamePerformance, message: 'GroupGCNamePerformance details updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a GroupGCNamePerformance
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGroupGCNamePerformance = await GroupGCNamePerformance.findByIdAndDelete(id);

    if (!deletedGroupGCNamePerformance) {
      return res.status(404).send({ message: 'GroupGCNamePerformance not found' });
    }

    res.status(200).send({ message: 'GroupGCNamePerformance deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
