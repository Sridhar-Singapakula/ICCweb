const mongoose = require("mongoose");
const Joi = require("joi");


const querySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true
  },
  dateOfCreation: {
    type: Date,
    default: Date.now
  }
});



const Query = mongoose.model("Query", querySchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    emailId: Joi.string().email().required(),
    mobileNumber: Joi.string().required(),
    subject: Joi.string().allow(""),
    message: Joi.string().required(),

  });

  return schema.validate(data);
};

module.exports = { Query, validate };
