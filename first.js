const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
// console.log(bodyParser);
app.use(bodyParser.json());


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

app.listen(3000, ()=>{
  console.log("listening to the port 3000");
})