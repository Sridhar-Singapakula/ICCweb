const mongoose = require('mongoose');
const Joi = require('joi');

const messageSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
    required: true
  },
 message:{
  type:String,
  required: true
 },
 createdAt: {type: Date,
  default: Date.now},
});



const validate=(message)=>{
  const schema = Joi.object({
    client:Joi.string().required(),
    message:Joi.string().required(),
  });

  return schema.validate(message);
};
const Message = mongoose.model('message', messageSchema);
module.exports = { Message, validate};
