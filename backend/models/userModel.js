const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      
    },
    lastname: {
      type: String,
   
    },
    email: {
      type: String,
      
    },
    password: {
      type: String,
      
    },
    country: {
      type: {
        value: String,
        label: String
      },
      
    },
    gender: {
      type: String,
      
    },
    dob: {
      type: String,
      
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
