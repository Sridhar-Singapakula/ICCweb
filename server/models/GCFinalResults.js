const mongoose = require("mongoose");
const Joi = require("joi");

const gcFinalResultsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    default: "GCFinalResults",
  },
  participants: [
    {
      name: {
        type: String,
      },
      rollNo: {
        type: String,
      },
      hostelNo: {
        type: String,
      },
      Points: {
        type: String, // Assuming Points should be a number
      },
    },
  ],
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
});

const GCFinalResults = mongoose.model("GCFinalResults", gcFinalResultsSchema);

const validateGCFinalResults = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    participants: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        rollNo: Joi.string(),
        hostelNo: Joi.string(),
        Points: Joi.number(),
      })
    ),
  });

  return schema.validate(data);
};

module.exports = { GCFinalResults, validateGCFinalResults };
