const express =require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const asyncHandler = require('express-async-handler');
const {protect} = require('../middleware/Authmiddleware')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })
}

router.post('/register', async(req,res) => {
    const {name,email,password,cpassword} = req.body
    if(!name || !email || !password || !cpassword)
    {
        res.status(400)
        throw new Error('Please add all fields')  
    }
    const userExists = await User.findOne({email})
    if(userExists)
    {
        res.status(400)
        throw new Error('User already exists')    
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    try {
        const user = await newUser.save()
        
        res.status(201).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            password: user.password
        })
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post('/login', async(req,res) => {
    const {email,password} = req.body
    console.log('k');
    try {
        const user = await User.findOne({email:email})
        console.log(user)
        const token=await generateToken(user._id);
        console.log(token);
        if(user && (await bcrypt.compare(password,user.password))){
            console.log('s');
            
            res.status(201).json({
                name: user.name,
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                token : token
            })
        }
        else{
            res.status(400).json({message: 'Login failed'})
        }
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.get('/getAllUsers',protect,async (req,res) => {
    try {
        const result = await User.find();
        res.send(result);
    } catch (error) {
        return res.status(400).json({error})
    }
})

module.exports = router