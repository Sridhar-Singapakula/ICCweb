const mongoose = require("mongoose");
const Joi = require("joi");

const competitionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Type:{
    type:String,
    default:"GCparticipants"
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
    },
  ],
  dateOfCreation: {
    type: Date,
    default: Date.now
  }
});

const Competition = mongoose.model("Competition", competitionSchema);

const validateCompetition = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    participants: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        rollNo: Joi.string(),
        hostelNo: Joi.string(),
      })
    ),
  });

  return schema.validate(data);
};

module.exports = { Competition, validateCompetition };
