const mongoose = require("mongoose");
const Joi = require("joi");


const blogSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  img:{
    type: String,
    required:true
  },
  blog: {
    type: String,
    required: true
  },
  dateOfCreation: {
    type: Date,
    default: Date.now,
  }
  }, {
    toJSON: { virtuals: true }
});
blogSchema.virtual('formattedDateOfCreation').get(function () {
    return this.dateOfCreation.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  });
  



const Blog = mongoose.model("Blog", blogSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    subject: Joi.string().required(),
    img:Joi.string().required(),
    blog: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = { Blog, validate };
