const express = require('express')
const app = express();
const dbConfig = require('./db')
const userRouter = require('./routes/userRoute')
const roomsRoute = require("./routes/roomsRoutes")
const bookingsRoute = require("./routes/bookingsRoute")
const cors = require('cors')
const dotenv = require('dotenv');
const config = require('./config/config.env')
const Razorpay = require('razorpay')
const paymentRoute = require('./routes/paymentRoute')

dotenv.config();
var instance = new Razorpay({ key_id: "rzp_test_p4HuA905NOORxZ", key_secret: "7Z04VSqi0YkJnhTj8JSbyeFp" })

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/users',userRouter);
app.use('/api/bookings',bookingsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/getkey", (req, res) => {
    res.status(200).json({key: "rzp_test_p4HuA905NOORxZ"})
});

app.listen(port, () => console.log(`Server listening on port ${port}`));