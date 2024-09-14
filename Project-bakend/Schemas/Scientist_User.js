//email,password,name,id,qualification,department,phone number,tickets
const mongoose = require("mongoose");
const Ticket_Schema=require('../Schemas/Ticket_Schema');
const Scientist_User_Schema = new mongoose.Schema({
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
      id: {
        type: Number,
        unique: true
      },
      qualification: {
        type: String,
        required: true
      },
      department: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket_Schema' // Reference to the tickets schema
      }]
    

});

module.exports = mongoose.model('Scientist_User_Schema  ', Scientist_User_Schema);