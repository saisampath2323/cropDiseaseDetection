const Farmer_User_Schema=require('../Schemas/Farmer_User');
const Scientist_User_Schema=require('../Schemas/Scientist_User');
const Solution_Schema=require('../Schemas/Solution_Schema');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define the Ticket Schema
const ticketSchema = new mongoose.Schema({
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Farmer_User_Schema',
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    required: true // If you want this field to be required, otherwise you can remove it
  },
  status: {
    type: String,
    default: 'pending' // You can add a default value if required
  },
  Solved_by:[{
    type:Schema.Types.ObjectId,
    ref:'Scientist_User_Schema'
  }],
  Solutions:[{
    type:Schema.Types.ObjectId,
    ref:'Solution_Schema'
  }]


});

module.exports= mongoose.model('ticketSchema', ticketSchema);