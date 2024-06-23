const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
// console.log(bodyParser);
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('welcome to our Hotel');
})


// Import the router files
const personRoutes = require('./routes/personRoutes.js');
const menuItemRoutes = require('./routes/MenuItemRoutes.js');
//this is

//use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, ()=>{
  console.log("listening to the port 3000");
})