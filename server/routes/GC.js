const router = require("express").Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { Hostel, validateHostel } = require("../models/GC");

// Create a new hostel
router.post('/', admin, async (req, res) => {
  try {
    const { error } = validateHostel(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const newHostel = new Hostel({
      hostelName: req.body.hostelName,
      totalGCpoints: req.body.totalGCpoints,
      numberOfGold: req.body.numberOfGold,
    });

    await newHostel.save();

    res.status(201).send({ data: newHostel, message: 'Hostel created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all hostels
router.get('/', async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).send({ data: hostels });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Edit hostel details
router.put('/:id', [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;
    const { hostelName, totalGCpoints, numberOfGold } = req.body;

    const hostel = await Hostel.findById(id);
    if (!hostel) {
      return res.status(404).send({ message: 'Hostel not found' });
    }
    // Update the hostel details if provided
    if (hostelName) {
      hostel.hostelName = hostelName;
    }
    if (totalGCpoints) {
      hostel.totalGCpoints =hostel.totalGCpoints ;
    }
    if (numberOfGold) {
      hostel.numberOfGold = hostel.numberOfGold ;
    }

    // Save the updated hostel
    await hostel.save();

    res.status(200).send({ data: hostel, message: 'Hostel details updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//Add points

router.post('/:id/add-points', [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;
    const { points} = req.body;

    if (!points || typeof points !== 'number') {
      return res.status(400).send({ message: 'Invalid points value' });
    }

    const hostel = await Hostel.findById(id);
    if (!hostel) {
      return res.status(404).send({ message: 'Hostel not found' });
    }

    // Add points to the existing totalGCpoints
    hostel.totalGCpoints += points;
    // hostel.numberOfGold  +=numberOfGold;

    // Save the updated hostel
    await hostel.save();

    res.status(200).send({ data: hostel, message: `Added ${points} points to totalGCpoints` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a hostel
router.delete('/:id', [validateObjectId, admin], async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHostel = await Hostel.findByIdAndDelete(id);

    if (!deletedHostel) {
      return res.status(404).send({ message: 'Hostel not found' });
    }

    res.status(200).send({ message: 'Hostel deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get a specific hostel
router.get('/:id', [validateObjectId, auth], async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Invalid hostel ID' });
    }

    const hostel = await Hostel.findById(id);

    if (!hostel) {
      return res.status(404).send({ message: 'Hostel not found' });
    }
    res.status(200).send({ data: hostel });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
