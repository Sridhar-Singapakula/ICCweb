const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const {
  GroupGCPerformance,
  validateGroupPerformance
} = require("../models/GroupGCRank");

// Create a new GroupGCNamePerformance
router.post('/', async (req, res) => {
  try {
    const { error } = validateGroupPerformance(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const newGroupGCPerformance = new GroupGCPerformance({
      name: req.body.name,
      participants: req.body.participants,
    });

    await newGroupGCPerformance.save();

    res.status(201).send({ data: newGroupGCPerformance, message: 'GroupGCPerformance added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all GroupGCPerformance
router.get('/', async (req, res) => {
  try {
    const groupGCPerformances = await GroupGCPerformance.find();
    res.status(200).send({ data: groupGCPerformances });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Edit GroupGCPerformance details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const groupGCPerformance = await GroupGCPerformance.findByIdAndUpdate(id, req.body, { new: true });
    if (!groupGCPerformance) {
      return res.status(404).send({ message: 'GroupGCPerformance not found' });
    }

    res.status(200).send({ data: groupGCPerformance, message: 'GroupGCPerformance details updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
// Add participant to a GC Final Result
router.post('/:id/add-participant', [validateObjectId, admin], async (req, res) => {
    try {
      const { id } = req.params;
      const { participant } = req.body;
  
      if (!participant || typeof participant !== 'object') {
        return res.status(400).send({ message: 'Invalid participant data' });
      }
  
      const gcFinalResult = await GroupGCPerformance.findById(id);
      if (!gcFinalResult) {
        return res.status(404).send({ message: 'GC performance not found' });
      }
  
      // Add the participant to the participants array
      gcFinalResult.participants.push(participant);
  
      // Save the updated GC Final Result
      await gcFinalResult.save();
  
      res.status(200).send({ data: gcFinalResult, message: 'Hostel Performance points added to the GC Final Result' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

// Delete a GroupGCPerformance
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGroupGCPerformance = await GroupGCPerformance.findByIdAndDelete(id);

    if (!deletedGroupGCPerformance) {
      return res.status(404).send({ message: 'GroupGCPerformance not found' });
    }

    res.status(200).send({ message: 'GroupGCPerformance deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
