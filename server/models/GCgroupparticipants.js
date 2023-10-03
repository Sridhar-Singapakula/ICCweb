const mongoose = require("mongoose");
const Joi = require("joi");

const GroupCompetitionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Type:{
    type:String,
    default:"GCgroupparticipants"
  },
  Link:{
    type:String,
    required:true,
  },
  dateOfCreation: {
    type: Date,
    default: Date.now
  }
});

const GroupCompetition = mongoose.model("GroupCompetition", GroupCompetitionSchema);

const validateGroupCompetition = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    Link:Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = { GroupCompetition, validateGroupCompetition };
