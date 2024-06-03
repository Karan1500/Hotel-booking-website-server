const express = require('express');

const router = express.Router();

const Razorpay = require('razorpay')

var instance = new Razorpay({ key_id: "rzp_test_p4HuA905NOORxZ", key_secret: "7Z04VSqi0YkJnhTj8JSbyeFp" })

router.post('/checkout', async (req, res) => {

    try {
        const options = {
            amount: Number(req.body.amount*100),
            currency: "INR",
          };
          const order = await instance.orders.create(options);
          res.status(200).json({
            success: true,
            order,
          });
        
    } catch (error) {
        console.log(error);
    }
  });

router.post('/paymentverification', async (req, res) => {

    try {
      console.log(req.body);
      res.status(200).json({
          success:true,
      });
      // window.location.href = "/home";
    } catch (error) {
        console.log(error);
    }
  });

module.exports = router;