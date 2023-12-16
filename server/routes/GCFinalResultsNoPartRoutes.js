const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { GCFinalResultsNoPart, validateGCFinalResultsNoPart } = require("../models/GCfinalResultswithoutpart");

// Create a new GC Final Result
router.post('/', async (req, res) => {
  try {
    const { error } = validateGCFinalResultsNoPart(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    
    const newGCFinalResult = new GCFinalResultsNoPart({
      name: req.body.name,
      participants: req.body.participants,
    });

    await newGCFinalResult.save();

    res.status(201).send({ data: newGCFinalResult, message: 'GC Final Result created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
// Get all GCFinalResultsNoPart
router.get('/', async (req, res) => {
  try {
    const gcFinalResults = await GCFinalResultsNoPart.find();
    res.status(200).send({ data: gcFinalResults });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Edit GCFinalResultsNoPart details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const gcFinalResult = await GCFinalResultsNoPart.findByIdAndUpdate(id, req.body, { new: true });
    if (!gcFinalResult) {
      return res.status(404).send({ message: 'GCFinalResultsNoPart not found' });
    }

    res.status(200).send({ data: gcFinalResult, message: 'GCFinalResultsNoPart details updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a GCFinalResultsNoPart
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGCFinalResult = await GCFinalResultsNoPart.findByIdAndDelete(id);

    if (!deletedGCFinalResult) {
      return res.status(404).send({ message: 'GCFinalResultsNoPart not found' });
    }

    res.status(200).send({ message: 'GCFinalResultsNoPart deleted successfully' });
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

    const gcFinalResult = await GCFinalResultsNoPart.findById(id);
    if (!gcFinalResult) {
      return res.status(404).send({ message: 'GC Final Result not found' });
    }

    // Add the participant to the participants array
    gcFinalResult.participants.push(participant);

    // Save the updated GC Final Result
    await gcFinalResult.save();

    res.status(200).send({ data: gcFinalResult, message: 'Participant added to the GC Final Result' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
// Get a specific GC Final Result
router.get('/:id', [validateObjectId, auth], async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Invalid GC Final Result ID' });
    }

    const gcFinalResult = await GCFinalResultsNoPart.findById(id);

    if (!gcFinalResult) {
      return res.status(404).send({ message: 'GC Final Result not found' });
    }
    res.status(200).send({ data: gcFinalResult });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
