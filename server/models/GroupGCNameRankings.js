const mongoose = require("mongoose");
const Joi = require("joi");

const groupGcNamePerformanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    default: "GroupGCNamePerformance",
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

const GroupGCNamePerformance = mongoose.model("GroupGCNamePerformance", groupGcNamePerformanceSchema);

const validateGroupNamePerformance = (data) => {
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

module.exports = { GroupGCNamePerformance, validateGroupNamePerformance };
