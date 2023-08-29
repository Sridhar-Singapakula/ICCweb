const router = require("express").Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {Blog,validate} = require("../models/blog")




// Create a new query
router.post('/',admin, async (req, res) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        img:Joi.string().required(),
        subject: Joi.string().required(),
        blog: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
  
      const newBlog = new Blog({
        name: req.body.name,
        subject: req.body.subject,
        img:req.body.img,
        blog: req.body.blog,
      });
  
      await newBlog.save();
  
      res.status(201).send({ data: newBlog, message: 'Uploaded Blog successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });


  // Get all queries
router.get('/',async (req, res) => {
    try {
      const blogs = await Blog.find();
  
      res.status(200).send({ data: blogs });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;