const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      
    },
    lastname: {
      type: String,
      required: true,
   
    },
    email: {
      type: String,
      required: true,
      
    },
    password: {
      type: String,
      required: true,
      
    },
    country: {
      type: {
        value: String,
        label: String
      },
      required: true,
      
    },
    gender: {
      type: String,
      required: true,
      
    },
    dob: {
      type: String,
      required: true,
      
    },
    age: {
      type:String,
     
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
