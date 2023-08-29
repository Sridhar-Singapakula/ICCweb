const router = require("express").Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {Query,validate} = require("../models/queries")




// Create a new query
router.post('/', async (req, res) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        emailId: Joi.string().email().required(),
        mobileNumber: Joi.string().required(),
        subject: Joi.string().allow(""),
        message: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
  
      const newQuery = new Query({
        name: req.body.name,
        emailId: req.body.emailId,
        mobileNumber:req.body.mobileNumber,
        subject: req.body.subject,
        message: req.body.message,
      });
  
      await newQuery.save();
  
      res.status(201).send({ data: newQuery, message: 'message sent successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });


  // Get all queries
router.get('/',admin,async (req, res) => {
    try {
      const queries = await Query.find();
  
      res.status(200).send({ data: queries });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;