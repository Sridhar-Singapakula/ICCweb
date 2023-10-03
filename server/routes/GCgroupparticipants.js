const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { GroupCompetition, validateGroupCompetition } = require("../models/GCgroupparticipants");

// Create a new competition
router.post('/', async (req, res) => {
  try {
    const { error } = validateGroupCompetition(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    
    const newCompetition = new GroupCompetition({
      name: req.body.name,
      Link:req.body.Link
    });

    await newCompetition.save();

    res.status(201).send({ data: newCompetition, message: 'GC group Competition created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all competitions
router.get('/', async (req, res) => {
  try {
    const competitions = await GroupCompetition.find();
    res.status(200).send({ data: competitions });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Delete a competition
router.delete('/:id', [validateObjectId, admin], async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedCompetition = await GroupCompetition.findByIdAndDelete(id);
  
      if (!deletedCompetition) {
        return res.status(404).send({ message: 'Competition not found' });
      }
  
      res.status(200).send({ message: 'GroupCompetition deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

  
module.exports = router;