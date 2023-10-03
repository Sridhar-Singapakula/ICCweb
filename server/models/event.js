const mongoose = require("mongoose");
const Joi = require("joi");

const eventSchema = new mongoose.Schema({
  GC: {
    type: String,
    required: true,
  },
  Venue: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  img:{
    type:String,
    required:true,
  },
  Secy: {
    type: String,
    required: true,
  },
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
  Type:{
    type:String,
    default:"event"
  },
}, {
  toJSON: { virtuals: true }
});

eventSchema.virtual('formattedDate').get(function () {
  return this.Date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
});

const Event = mongoose.model("Event", eventSchema);

const validateEvent = (data) => {
  const schema = Joi.object({
    GC: Joi.string().required(),
    Venue: Joi.string().required(),
    Date: Joi.string().required(),
    img:Joi.string().required(),
    Secy: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = { Event, validateEvent };
