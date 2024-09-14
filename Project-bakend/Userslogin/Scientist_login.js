const Scientist_User=require('../Schemas/Scientist_User');
const Ticket_Schema=require('../Schemas/Ticket_Schema')
const  express = require('express');
const jwt=require("jsonwebtoken");
const router = express.Router();
const Solutions_Schema=require('../Schemas/Solution_Schema');
const secretKey ="nFmJ29qxqgMssJ7gxhriwE+1r8Awp8egXnpRkC3CjIM=";
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  //const temp_token=token.replace("Bearer","");
  console.log(token);
  
  jwt.verify(token, secretKey, (err, decoded) => {
   
   
    if (err) {
      console.log(err);
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = decoded; 
    console.log(decoded);
    next();
  });
}
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Scientist_User.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      
      const token = jwt.sign({email: user.email }, secretKey);
      //console.log(token);
      console.log(secretKey);
      
  
      res.json({ token:token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get("/",verifyToken,(req,res)=>{
    res.send("sai");
  })
  router.post('/signup', async (req, res) => {
  
    try {
      // Check if the user already exists
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
  
      // Save the user to the database
     
  
      // Generate a token
      const token = jwt.sign({ email: newScientistUser.email }, secretKey);
  
      // Respond with the token
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post("/getAlltickets", async (req, res) => {
    try {
      // Fetch all tickets from the Ticket_Schema
      const tickets = await Ticket_Schema.find({status:"pending"});
  
      // Check if there are any tickets
      if (!tickets.length) {
        return res.status(404).json({ message: 'No tickets found' });
      }
  
      // Prepare the tickets with images in base64 format
      const ticketsWithImages = tickets.map(ticket => ({
        _id: ticket._id,
        uploadedBy: ticket.uploadedBy, // You can populate this if needed
        description: ticket.description,
        status: ticket.status,
        image: {  
          data: `data:${ticket.image.contentType};base64,${ticket.image.data.toString('base64')}`, // Convert image data to base64
          contentType: ticket.image.contentType
        },
        Solved_by: ticket.Solved_by // Assuming this contains references to Scientist_User_Schema
      }));
       console.log(ticketsWithImages.length);
      // Respond with the tickets and images
      
      res.status(200).json({
        message: 'Tickets fetched successfully',
        tickets: ticketsWithImages
      });
    } catch (error) {
      console.error('Error fetching tickets:', error);
      res.status(500).json({
        message: 'Error fetching tickets',
        error: error.message
      });
    }
  });
  router.post("/uploadSolution",verifyToken, async (req, res) => {
    try {
      const { diseaseName, percentageOfDisease, solution, cropName, TicketId } = req.body;
      const { email } = req.user; // Assuming you're using a JWT middleware that adds `req.user`
  
      // Validate the request body
      if (!email || !diseaseName || !percentageOfDisease || !solution || !cropName || !TicketId) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Find the scientist by email
      const scientist = await Scientist_User.findOne({ email: email });
      if (!scientist) {
        return res.status(404).json({ message: 'Scientist not found' });
      }
  
      // Create a new solution
      const newSolution = new Solutions_Schema({
        diseaseName: diseaseName,
        percentageOfDisease: percentageOfDisease,
        solution: solution,
        cropName: cropName,
        scientistId: scientist._id // Assign the found scientist's ID
      });
  
      // Save the solution to the database
      await newSolution.save();
  
      // Find the corresponding ticket by TicketId
      const ticket = await Ticket_Schema.findById(TicketId);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Add the solution and scientist to the ticket
      ticket.Solutions.push(newSolution._id);
      ticket.Solved_by.push(scientist._id);
      ticket.status="solved"
      const scientist_add=await Scientist_User.findById(scientist._id);
      console.log(ticket._id);
      scientist_add.tickets.push(ticket._id);
  
      // Save the updated ticket
      await scientist_add.save();
      await ticket.save();
  
      // Respond with success message
      res.status(201).json({
        message: 'Solution created successfully',
        solution: newSolution,
        // tickets: ticket
      });
    } catch (error) {
      console.error('Error uploading solution:', error);
      res.status(500).json({
        message: 'Error uploading solution',
        error: error.message
      });
    }
  });
  router.post("/getHistory", verifyToken, async (req, res) => {
    try {
      const { email } = req.user;
  
      // Find the scientist by email
      const scientist = await Scientist_User.findOne({ email: email });
      if (!scientist) {
        return res.status(404).json({ message: 'Scientist not found' });
      }
  
      // Fetch all tickets
      const allTickets = await Ticket_Schema.find();
  
      // Filter tickets that were solved by the scientist
      const recqTickets = allTickets.filter(ticket => {
        return ticket.Solved_by.some(solvedBy => solvedBy.equals(scientist._id));
      });
  
      // Check if any tickets were found
      if (!recqTickets.length) {
        return res.status(404).json({ message: 'No tickets solved by this scientist' });
      }
  
      // Prepare the tickets with images in base64 format
      const ticketsWithImages = recqTickets.map(ticket => ({
        _id: ticket._id,
        uploadedBy: ticket.uploadedBy, // Populate this if needed
        description: ticket.description,
        status: ticket.status,
        image: {
          data: `data:${ticket.image.contentType};base64,${ticket.image.data.toString('base64')}`, // Convert image data to base64
          contentType: ticket.image.contentType
        },
        Solutions: ticket.Solutions, // Populate the solutions if needed
        Solved_by: ticket.Solved_by // Scientist references
      }));
  
      // Send the filtered tickets with base64 image data
      res.status(200).json(ticketsWithImages);
    } catch (error) {
      console.error('Error fetching ticket history:', error);
      res.status(500).json({ message: 'Error fetching ticket history', error: error.message });
    }
  });
  
  
  
  
module.exports=router;