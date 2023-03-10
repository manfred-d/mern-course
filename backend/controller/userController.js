const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');

// @desc register new user
// @access public
// @route POST /api/users

const registerUser = asyncHandler(async(req, res) =>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exist
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already Exists')
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password:hashpassword
    })

    if (user) {
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)// jwt token
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials');
    }
})

// @desc authenticate user
// @access public
// @route POST /api/users/login

const loginUser = asyncHandler(async(req, res) =>{
    const  {email,password} = req.body

    // check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password) )) {
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials');
    }

})

// @desc get user data
// @access private
// @route GET /api/users/me

const getMe = asyncHandler(async(req, res) =>{
    // res.json({ message: 'User data display'});
    res.status(400).json(req.user)
})

// Generate JWT token
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRECT, {
        expiresIn:'30d',
    });
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}