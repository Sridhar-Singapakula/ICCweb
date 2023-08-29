const mongoose = require("mongoose");
const Joi = require("joi");

const ObjectId = mongoose.Schema.Types.ObjectId;

const directPatientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  age: {
    type:String,
    required:true
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },
  hospitalName: {
    type: String
  },
  doctorName: {
    type: String
  },
  mobileNumber: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required:true
  },
  report:{
    type: String
  },
  address:{
    type: String,
    required:true
  },
  tests: [
    {
      test: {
        type: ObjectId,
        ref: "tests",
        required: true
      },
      status: {
        recordDate: {
          type: Date,
          default: new Date() 
        },
        repeatReason: {
          type: String,
          default:""
        },
        status: {
          type: String,
          enum: ["pending", "success", "rejected"],
          default: "pending"
        }
      }
    }
  ],
  packages: [
    {
      package: {
        type: ObjectId,
        ref: "packages"
      },
      status: {
        recordDate: {
          type: Date,
          default: new Date() 
        },
        repeatReason: {
          type: String,
          default:""
        },
        status: {
          type: String,
          enum: ["pending", "success", "rejected"],
          default: "pending"
        }
      }
    }
  ],
  totalCost: {
    type: Number
  },
  dateOfCreation: {
    type: Date,
    default: Date.now
  }
});



const directPatient = mongoose.model("directPatient", directPatientSchema);

const validate = (data) => {
  const schema = Joi.object({
    patientName: Joi.string().required(),
    age:Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    hospitalName: Joi.string().allow(""),
    doctorName: Joi.string().allow(""),
    mobileNumber: Joi.string().required(),
    emailId: Joi.string().required(),
    address:Joi.string().required(),
    tests: Joi.array().items(
      Joi.object({
        test: Joi.string().required(),
        status: Joi.object({
          recordDate: Joi.date().required(),
          repeatReason: Joi.string().required(),
          status: Joi.string().valid("pending", "success", "rejected").default("pending")
        })
      })
    ).min(1),
    packages: Joi.array().items(
      Joi.object({
        package: Joi.string(),
        status: Joi.object({
          recordDate: Joi.date().required(),
          repeatReason: Joi.string().required(),
          status: Joi.string().valid("pending", "success", "rejected").default("pending")
        })
      })
    ),
    totalCost: Joi.number(),
    report:Joi.string().allow("")
  });

  return schema.validate(data);
};

module.exports = { directPatient, validate };
