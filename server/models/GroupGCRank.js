const mongoose = require("mongoose");
const Joi = require("joi");

const groupGcPerformanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    default: "GroupGCPerformance",
  },
 
  participants: [
    {
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

const GroupGCPerformance = mongoose.model("GroupGCPerformance", groupGcPerformanceSchema);

const validateGroupPerformance = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    participants: Joi.array().items(
      Joi.object({
        hostelNo: Joi.string(),
        Position:Joi.string(),
      })
    ),
  });

  return schema.validate(data);
};

module.exports = { GroupGCPerformance, validateGroupPerformance };
