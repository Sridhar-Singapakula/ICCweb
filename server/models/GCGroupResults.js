const mongoose = require("mongoose");
const Joi = require("joi");

const GroupResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Type:{
    type:String,
    default:"GCGroupResult"
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

const GroupResult = mongoose.model("GroupResult", GroupResultSchema);

const validateGroupResult = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    Link:Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = { GroupResult, validateGroupResult };
