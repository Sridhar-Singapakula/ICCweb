const mongoose = require("mongoose");
const Joi = require("joi");

const gcFinalResultsNoPartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    default: "GCFinalResultsnoparticipants",
  },
 
  participants: [
    {
      hostelNo: {
        type: String,
      },
      Points: {
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

const GCFinalResultsNoPart = mongoose.model("GCFinalResultsNoPart", gcFinalResultsNoPartSchema);

const validateGCFinalResultsNoPart = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    participants: Joi.array().items(
      Joi.object({
        hostelNo: Joi.string(),
        Points: Joi.string(),
        Position:Joi.string(),
      })
    ),
  });

  return schema.validate(data);
};

module.exports = { GCFinalResultsNoPart, validateGCFinalResultsNoPart };
