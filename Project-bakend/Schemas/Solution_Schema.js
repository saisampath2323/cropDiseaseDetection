const mongoose = require("mongoose");
const Scientist_User=require('./Scientist_User');
const SolutionsSchema = new mongoose.Schema({
    diseaseName: {
      type: String,
      required: true
    },
    percentageOfDisease: {
      type: String,
      required: true
    },
    solution: {
      type: String,
      required: true
    },
    cropName: {
      type: String,
      required: true
    },
    scientistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scientist_User',
      required: true
    }
  });
  
module.exports= mongoose.model('Solution', SolutionsSchema);

  