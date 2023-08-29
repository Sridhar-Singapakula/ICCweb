const mongoose = require('mongoose');
const Joi = require('joi');

const PackageSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  testsIncluded: [
    {
      type: String,
      required: true,
    },
  ],
  Samples:[
    {
      type: String,
      required: true,
    },
  ]
});

const Package = mongoose.model('Package', PackageSchema);

function validatePackage(package) {
  const schema = Joi.object({
    packageName: Joi.string().required(),
    mrp: Joi.number().required(),
    testsIncluded: Joi.array().items(Joi.string()).required(),
    Samples: Joi.array().items(Joi.string()).required(),
  });
  return schema.validate(package);
}

module.exports = { Package, validatePackage };
