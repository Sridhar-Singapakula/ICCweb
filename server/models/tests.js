const mongoose = require('mongoose');
const Joi = require('joi');

const TestSchema = new mongoose.Schema({
  
  testName: {
    type: String,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  sampleType: {
    type: String,
    required: true
  },
  collectionTube: {
    type: String,
 
  }
});

const Test = mongoose.model('Test', TestSchema);

function validateTest(test) {
  const schema = Joi.object({
    testName: Joi.string().required(),
    mrp: Joi.number().required(),
    sampleType: Joi.string().required(),
    collectionTube: Joi.string().allow("")
  });
  return schema.validate(test);
}

module.exports = { Test, validateTest };
