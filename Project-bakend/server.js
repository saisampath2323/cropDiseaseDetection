const express = require('express'); 
const cors=require('cors');
const jwt=require("jsonwebtoken");
const bodyParser = require('body-parser');
const ObjectId = require('mongoose').Types.ObjectId;
const multer = require('multer');
const farmer_login=require("./Userslogin/Farmer_login");
const Scientist_login=require("./Userslogin/Scientist_login");
const app = express(); 
const PORT = 3002;
const Dbconnect=require('./Db/Db_connect');
const Farmer_User_Schema=require('./Schemas/Farmer_User');
const Scientist_User_Schema=require('./Schemas/Scientist_User');
const Ticket_Schema = require('./Schemas/Ticket_Schema');
const routes=require('./routes');
app.use(express.json());
app.use(cors())
app.use("/scientist",Scientist_login);
app.use("/create",routes);
app.use("/farmer",farmer_login);
app.listen(PORT, (error) =>{ 

    if(!error) {
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)}
    else {
        console.log("Error occurred, server can't start", error); 
    }
});
app.get('/',(req,res)=>{
    res.send("sai");
});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/ticket-image/:ticketId', async (req, res) => {
    const { ticketId } = req.params;
  
    try {
      const ticket = await Ticket_Schema.findById(ticketId).exec();
      if (!ticket) {
        return res.status(404).send('Ticket not found');
      }
  
      // Send the image data
      res.set('Content-Type', ticket.image.contentType);
      res.send(ticket.image.data);
    } catch (err) {
      res.status(500).send('Error fetching image: ' + err.message);
    }
  });
Dbconnect();
// const Cheak=new Scientist_User_Schema({"email":"milavarapusaisampath@gmail.com","password":"saisampath123"});
// Cheak.save();

