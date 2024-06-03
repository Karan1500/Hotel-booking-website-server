const express =require('express')
const router = express.Router();
const User = require('../models/User')

router.post('/register', async(req,res) => {
    const newUser = new User(req.body)

    try {
        const user = await newUser.save()
        res.send('User registered succesfully')
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post('/login', async(req,res) => {
    const {email,password} = req.body

    try {
        const user = await User.findOne({email:email, password: password})
        if(user){
            const temp ={
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            res.send(temp)
        }
        else{
            res.status(400).json({message: 'Login failed'})
        }
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.get('/getAllUsers',async (req,res) => {
    try {
        const result = await User.find();
        res.send(result);
    } catch (error) {
        return res.status(400).json({error})
    }
})

module.exports = router