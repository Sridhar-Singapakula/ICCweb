const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { Competition, validateCompetition } = require("../models/GCparticipants");

// Create a new competition
router.post('/', async (req, res) => {
  try {
    const { error } = validateCompetition(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    
    const newCompetition = new Competition({
      name: req.body.name
    });

    await newCompetition.save();

    res.status(201).send({ data: newCompetition, message: 'Competition created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all competitions
router.get('/', async (req, res) => {
  try {
    const competitions = await Competition.find();
    res.status(200).send({ data: competitions });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Edit competition details
router.put('/:id', [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;
    const { name, participants } = req.body;

    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).send({ message: 'Competition not found' });
    }

    // Update the competition details if provided
    if (name) {
      competition.name = name;
    }
    if (participants) {
      competition.participants = participants;
    }

    // Save the updated competition
    await competition.save();

    res.status(200).send({ data: competition, message: 'Competition details updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a competition
router.delete('/:id', [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCompetition = await Competition.findByIdAndDelete(id);

    if (!deletedCompetition) {
      return res.status(404).send({ message: 'Competition not found' });
    }

    res.status(200).send({ message: 'Competition deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
// Add participant to a competition
router.post('/:id/add-participant', [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;
    const { participant } = req.body;

    if (!participant || typeof participant !== 'object') {
      return res.status(400).send({ message: 'Invalid participant data' });
    }

    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).send({ message: 'Competition not found' });
    }

    // Add the participant to the participants array
    competition.participants.push(participant);

    // Save the updated competition
    await competition.save();

    res.status(200).send({ data: competition, message: 'Participant added to the competition' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


// Get a specific competition
router.get('/:id', [validateObjectId, auth], async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Invalid competition ID' });
    }

    const competition = await Competition.findById(id);

    if (!competition) {
      return res.status(404).send({ message: 'Competition not found' });
    }
    res.status(200).send({ data: competition });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
