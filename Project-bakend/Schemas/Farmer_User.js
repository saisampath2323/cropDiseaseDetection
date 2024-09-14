const mongoose = require("mongoose");
//email,password,name,number,locartion,landarea,language,
const Farmer_User_Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true  
      },
      number: {
        type: String,
        required: true 
      },
      location: {
        type: String,
        required: true 
      },
      landArea: {
        type: String,
        required: true 
      },
      language: {
        type: String,
        required: true 
      }
    

});

module.exports = mongoose.model('Farmer_User_Schema', Farmer_User_Schema);