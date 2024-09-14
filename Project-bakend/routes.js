const express = require('express');
const router = express.Router();
const multer = require('multer');
const Farmer_User_Schema=require('./Schemas/Farmer_User')
const Scientist_User=require('./Schemas/Scientist_User');
const Ticket_Schema = require('./Schemas/Ticket_Schema');
const Solutions_Schema=require('./Schemas/Solution_Schema');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get("/",(req,res)=>{
    res.send("sai");
})
// POST endpoint to create a Ticket
router.post('/genrate_ticket', upload.single('image'), async (req, res) => {
    const { farmerId,description,status,solved_by,Solutions} = req.body;
    const image = req.file;
    //const farmerobjId=new ObjectId(farmerId)
    //console.log(farmerobjId);
    if (!farmerId || !image) {
      return res.status(400).send('Farmer ID and image are required');
    }
  
    try {
      // Check if the farmer exists
      const farmer = await Farmer_User_Schema.findById(farmerId);
      if (!farmer) {
        return res.status(404).send('Farmer not found');
      }
  
      // Create a new ticket
      const newTicket = new Ticket_Schema({
        uploadedBy: farmerId,
        image: {
          data: image.buffer,
          contentType: image.mimetype
        },
        description:description,
        status:status,
        solved_by:solved_by,
        Solutions:Solutions

      });
  
      // Save the ticket to the database
      const ticket = await newTicket.save();
      res.status(201).json(ticket);
    } catch (err) {
      res.status(500).send('Error saving ticket: ' + err.message);
    }
  });
 // email,password,name,number,locartion,landarea,language,
 router.post("/farmer",async(req,res)=>{
  
   try {
    const { email, password, name, number, location, landArea, language } = req.body;

    // Create a new farmer user object
    const newFarmerUser = new Farmer_User_Schema({
      email,
      password,
      name,
      number,
      location,
      landArea,
      language
    });

    // Save the farmer user to the database
    await newFarmerUser.save();

    // Respond with success
    res.status(201).json({
      message: "Farmer user created successfully",
      farmer: newFarmerUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating farmer user", error });
  }
 });
 router.post('/scientist', async (req, res) => {
    try {
      const { email, password, name, id, qualification, department, phoneNumber } = req.body;
  
      // Validate that required fields are present
      if (!email || !password || !name || !id || !qualification || !department || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Create a new scientist user object
      const newScientistUser = new Scientist_User({
        email,
        password,
        name,
        id,
        qualification,
        department,
        phoneNumber
      });
  
      // Save the scientist user to the database
      await newScientistUser.save();
  
      // Respond with success
      res.status(201).json({
        message: 'Scientist user created successfully',
        scientist: newScientistUser
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating scientist user', error });
    }
  });
  router.post('/solutions', async (req, res) => {
    try {
      const { diseaseName, percentageOfDisease, solution, cropName, scientistId } = req.body;
  
      // Validate that required fields are present
      if (!diseaseName || !percentageOfDisease || !solution || !cropName || !scientistId) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if the scientist exists
      const scientist = await Scientist_User.findById(scientistId);
      if (!scientist) {
        return res.status(404).json({ message: 'Scientist not found' });
      }
  
      // Create a new solution object
      const newSolution = new Solutions_Schema({
        diseaseName,
        percentageOfDisease,
        solution,
        cropName,
        scientistId
      });
  
      // Save the solution to the database
      await newSolution.save();
  
      // Respond with success
      res.status(201).json({
        message: 'Solution created successfully',
        solution: newSolution
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating solution', error });
    }
  });

module.exports=router;