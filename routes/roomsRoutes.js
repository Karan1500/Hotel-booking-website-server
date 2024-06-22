const express = require("express");
const router = express.Router();
const {protect} = require('../middleware/Authmiddleware')
const Room = require("../models/room");

router.get("/getAllRooms",protect,async(req, res) => {

    try {
        const rooms = await Room.find({});
        res.send(rooms);
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

router.post("/getroombyid",protect,async(req, res) => {

    const roomid = req.body.roomid;

    try {
        const room = await Room.findOne({_id: roomid});
        res.send(room);
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

router.post("/addroom",protect,async(req, res) => {

    const newroom = new Room(req.body);

    try {
        const room = await newroom.save();       
        res.send('New Room Added Successfully');
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

module.exports = router;