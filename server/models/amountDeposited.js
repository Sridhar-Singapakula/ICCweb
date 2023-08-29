const mongoose = require('mongoose');
const Joi = require('joi');

const ObjectId = mongoose.Schema.Types.ObjectId;

const amountDepositedSchema = new mongoose.Schema(
  {
    client: {
      type: ObjectId,
      ref: 'client',
      required: true,
    },
    amountDeposited: {
      type: Number,
      required: true,
    },
    paymentTime: {
      type: Date,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['success', 'failure'],
      required: true,
    },
    dateOfCreation: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const AmountDeposited = mongoose.model('AmountDeposited', amountDepositedSchema);

function validateAmountDeposited(amountDeposited) {
  const schema = Joi.object({
    client: Joi.string().required(),
    amountDeposited: Joi.number().required(),
    paymentTime: Joi.date().required(),
    transactionId: Joi.string().required(),
    status: Joi.string().valid('success', 'failure').required()
  });

  return schema.validate(amountDeposited);
}

module.exports = { AmountDeposited, validateAmountDeposited };
