const mongoose = require("mongoose");

var mongoURL = "mongodb+srv://Karan:Karan123@karanapi.dva5vrw.mongodb.net/rooms";

mongoose.connect(mongoURL);

var connection  = mongoose.connection;

connection.on('error', ()=>{
    console.log("Mongo DB connection failed");
});

connection.on('connected', ()=>{
    console.log("Mongo DB connection successful");
});

module.exports = mongoose;