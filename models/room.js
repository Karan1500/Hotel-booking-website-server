const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    maxCount:{
        type: Number,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    rentPerDay:{
        type: Number,
        required: true
    },
    imageUrls: [],
    currentBookings: [],
    type:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    rating:[],
    count:{
        type: Number,
        // required: true
    }

},{
    timestamps: true,
});

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;