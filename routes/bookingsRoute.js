const express = require('express')
const router = express.Router()
const book = require('../models/Booking')
const roomModel = require('../models/room')
const moment = require('moment')
const {protect} = require('../middleware/Authmiddleware')

router.post('/bookroom',protect,async (req,res) => {
    const {roomname,roomid,userid,fromDate,toDate,totalAmount,totalDays} = req.body
    console.log(req.body)
    try {
        const newBooking = await book.create({
            room: roomname,
            roomid: roomid,
            userid,
            fromDate: fromDate,
            toDate: toDate,
            totalDays,
            totalAmount,
            transactionId: '1234',
            status:'booked'
        })    
        // const booking = await newBooking.save()
        console.log(newBooking)
        const roomtemp = await roomModel.findOne({_id: roomid})
        console.log(roomtemp);
        roomtemp.currentBookings.push({bookingid: newBooking._id, fromDate: fromDate,toDate: toDate,userid: userid,status: newBooking.status})
        roomtemp.count=roomtemp.count-1
        // await tempcurbookings.save()
        // roomtemp.currentBookings=tempcurbookings
        await roomtemp.save()
        console.log(roomtemp)
        res.send('Room booked successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post('/getbookingsbyuserid',protect,async(req,res) => {
    const userid = req.body.userid
    console.log(userid)
    try {
        const bookings = await book.find({userid:userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post('/cancelbooking',protect,async(req,res) => {
    const {bookingid,roomid}=req.body
    try {
        const booking = await book.findOne({_id:bookingid})
        booking.status='cancelled'
        await booking.save()
        const room = await roomModel.findOne({_id:roomid})
        const bookings = room.currentBookings
        const temp = bookings.filter((bookingroom) => bookingroom.bookingid.toString()!==bookingid)
        room.currentBookings = temp
        await room.save()

        res.send('Your booking cancelled successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.get('/getAllBookings',protect,async(req,res) => {
    try {
        const booking = await book.find()
        res.send(booking)
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post('/ratebooking', protect, async(req, res) => {
    try {
        const {bookingid, rating} = req.body
        const booking = await book.findOne({_id:bookingid})
        const room = await roomModel.findOne({_id:booking.roomid})
        room.rating.push(rating)
        await room.save()
        res.send('Your rating has been submitted successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
})

module.exports = router