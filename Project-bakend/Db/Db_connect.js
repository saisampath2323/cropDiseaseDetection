const mongoose = require("mongoose");

function Dbconnect() {
    mongoose.connect('mongodb://0.0.0.0:27017/Smart_India_hackathon', {
        
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = Dbconnect;
