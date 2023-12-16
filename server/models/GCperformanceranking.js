const mongoose = require("mongoose");
const Joi = require("joi");

const gcPerformanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    default: "GCPerformance",
  },
 
  participants: [
    {
      name: {
        type: String,
      },
      hostelNo: {
        type: String, // Assuming Points should be a number
      },
      Position:{
        type:String,
      },
    },
  ],
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
});

const GCPerformance = mongoose.model("GCPerformance", gcPerformanceSchema);

const validatePerformance = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    participants: Joi.array().items(
      Joi.object({
        hostelNo: Joi.string(),
        name: Joi.string(),
        Position:Joi.string(),
      })
    ),
  });

  return schema.validate(data);
};

module.exports = { GCPerformance, validatePerformance };
