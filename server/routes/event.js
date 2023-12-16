const router = require("express").Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Event, validateEvent } = require("../models/event");

// Create a new event
router.post('/', admin, async (req, res) => {
  try {
    const { error } = validateEvent(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const newEvent = new Event({
      GC: req.body.GC,
      Venue: req.body.Venue,
      Date: req.body.Date,
      img:req.body.img,
      Secy: req.body.Secy,
    });

    await newEvent.save();

    res.status(201).send({ data: newEvent, message: 'Announcement created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).send({ data: events });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTest = await Event.findByIdAndDelete(id);

    if (!deletedTest) {
      return res.status(404).send({ message: 'Announcement not found' });
    }

    res.status(200).send({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
