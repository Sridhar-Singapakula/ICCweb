const mongoose = require('mongoose');
const Joi = require('joi');

const HostelSchema = new mongoose.Schema({
  hostelName: {
    type: String,
    required: true
  },
  totalGCpoints: {
    type: Number,
    required: true
  },
  numberOfGold: {
    type: Number,
    required: true
  }
});

const Hostel = mongoose.model('Hostel', HostelSchema);

function validateHostel(hostel) {
  const schema = Joi.object({
    hostelName: Joi.string().required(),
    totalGCpoints: Joi.number().required(),
    numberOfGold: Joi.number().required()
  });
  return schema.validate(hostel);
}

module.exports = { Hostel, validateHostel };
