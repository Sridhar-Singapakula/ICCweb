const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { GCFinalResults, validateGCFinalResults } = require("../models/GCFinalResults");

// Create a new GC Final Result
router.post('/', async (req, res) => {
  try {
    const { error } = validateGCFinalResults(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    
    const newGCFinalResult = new GCFinalResults({
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

// Get all GC Final Results
router.get('/', async (req, res) => {
  try {
    const gcFinalResults = await GCFinalResults.find();
    res.status(200).send({ data: gcFinalResults });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Edit GC Final Result details
router.put('/:id', [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;
    const { name, participants } = req.body;

    const gcFinalResult = await GCFinalResults.findById(id);
    if (!gcFinalResult) {
      return res.status(404).send({ message: 'GC Final Result not found' });
    }

    // Update the GC Final Result details if provided
    if (name) {
      gcFinalResult.name = name;
    }
    if (participants) {
      gcFinalResult.participants = participants;
    }

    // Save the updated GC Final Result
    await gcFinalResult.save();

    res.status(200).send({ data: gcFinalResult, message: 'GC Final Result details updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a GC Final Result
router.delete('/:id', [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGCFinalResult = await GCFinalResults.findByIdAndDelete(id);

    if (!deletedGCFinalResult) {
      return res.status(404).send({ message: 'GC Final Result not found' });
    }

    res.status(200).send({ message: 'GC Final Result deleted successfully' });
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

    const gcFinalResult = await GCFinalResults.findById(id);
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

    const gcFinalResult = await GCFinalResults.findById(id);

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
