const mongoose = require('mongoose');
require('dotenv').config();


//Define the MongoDB connection URL 
// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGODB_URL;


// set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewURLParser : true,
    useUnifiedTopology : true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connedction.
const db = mongoose.connection;

// Define event Listeners for database connection

db.on('connected', ()=>{
    console.log("connection to MongoDB server.");
})

db.on('error', (err)=>{
    console.log("MongoDB connection error.",err);
})

db.on('disconnected', ()=>{
    console.log("MongoDB is disconnected.");
})

// Exports the database connection
module.exports = db;
