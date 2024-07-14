const mongoose = require("mongoose");

var mongoURL = "mongodb+srv://dhruvlad103:Dhruv%40daiict2003@cluster0.urzrau8.mongodb.net/mern-rooms";

mongoose.connect(mongoURL);

var connection  = mongoose.connection;

connection.on('error', ()=>{
    console.log("Mongo DB connection failed");
});

connection.on('connected', ()=>{
    console.log("Mongo DB connection successful");
});

module.exports = mongoose;