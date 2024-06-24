const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth.js');


// const Person = require('/models/Person.js');

const bodyParser = require('body-parser');
// console.log(bodyParser);
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


//middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next() // Move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session: false}); 

app.get('/',function (req, res) {
  res.send('welcome to our Hotel');
})


// Import the router files
const personRoutes = require('./routes/personRoutes.js');
const menuItemRoutes = require('./routes/MenuItemRoutes.js');

//use the routers
app.use('/person', localAuthMiddleware, personRoutes);
app.use('/menu',  menuItemRoutes);

app.listen(PORT, ()=>{
  console.log("listening to the port 3000");
})