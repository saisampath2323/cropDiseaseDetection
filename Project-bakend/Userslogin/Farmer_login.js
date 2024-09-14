const Farmer_User=require('../Schemas/Farmer_User');
const  express = require('express');
const jwt=require("jsonwebtoken");
const router = express.Router();
const secretKey ="nFmJ29qxqgMssJ7gxhriwE+1r8Awp8egXnpRkC3CjIM=";
const Ticket_Schema=require('../Schemas/Ticket_Schema')
const Solution_Schema=require('../Schemas/Solution_Schema')
const Scientist_User_Schema=require('../Schemas/Scientist_User')
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
router.post("/get_history", verifyToken, async (req, res) => {
  try {
    const { email } = req.user;

    // Find the user by email
    const user = await Farmer_User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch tickets uploaded by the user
    const tickets = await Ticket_Schema.find({ uploadedBy: user._id });

    if (!tickets.length) {
      return res.status(404).json({ message: 'No tickets found for this user' });
    }

    // Prepare tickets data with images
    const ticketsWithImages = tickets.map(ticket => ({
      _id: ticket._id,
      description: ticket.description,
      status: ticket.status,
      image: {
        data: `data:${ticket.image.contentType};base64,${ticket.image.data.toString('base64')}`, // Convert image data to base64
        contentType: ticket.image.contentType
      },
      solvedBy: ticket.Solved_by // Assuming it contains references to the Scientist_User_Schema
    }));

    // Send the response with all ticket data
    res.status(200).json({
      message: 'Tickets fetched successfully',
      tickets: ticketsWithImages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    console.log(password);
    try {
      const user = await Farmer_User.findOne({ email });
  
      if (!user || user.password !== password) {  
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      
      const token = jwt.sign({email: user.email }, secretKey);
      console.log(token);
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
      const { email, password, name, number, location, landArea, language } = req.body;

      const existingUser = await Farmer_User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Hash the password before saving it to the database
      // const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
     
      // Create a new farmer user object
      const newFarmerUser = new Farmer_User({
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
  
      // Save the user to the database
     
  
      // Generate a token
      const token = jwt.sign({ email: newFarmerUser.email }, secretKey);
  
      // Respond with the token
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post("/Viewticket", verifyToken, async (req, res) => {
    try {
      const { ticketId } = req.body; // Get ticket ID from request body
  
      // Fetch the ticket by ID
      const ticket = await Ticket_Schema.findById(ticketId);
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Fetch all solutions related to the ticket by their IDs
      const solutionsData = await Promise.all(
        ticket.Solutions.map(async (solutionId) => {
          const solution = await Solution_Schema.findById(solutionId); // Manually fetch the solution
          if (solution) {
            return {
              diseaseName: solution.diseaseName,
              percentageOfDisease: solution.percentageOfDisease,
              solution: solution.solution,
              cropName: solution.cropName,
              scientistId: solution.scientistId
            };
          }
          return null;
        })
      );
  
      // Remove any null results (in case any solutions weren't found)
      const filteredSolutions = solutionsData.filter(solution => solution !== null);
  
      // Prepare the ticket data along with solutions
      const ticketData = {
        description: ticket.description,
        status: ticket.status,
        image: {
          data: `data:${ticket.image.contentType};base64,${ticket.image.data.toString('base64')}`,
          contentType: ticket.image.contentType
        },
        solutions: filteredSolutions
      };
  
      // Send the response with ticket data and related solutions
      res.status(200).json({
        message: 'Ticket fetched successfully',
        ticket: ticketData
      });
  
    } catch (error) {
      console.error('Error fetching ticket:', error);
      res.status(500).json({
        message: 'Error fetching ticket',
        error: error.message
      });
    }
  });
  
  
module.exports=router;