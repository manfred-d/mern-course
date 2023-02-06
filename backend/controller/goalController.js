const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel');
const User = require("../models/userModel");
// @desc get goals
// #route Get /api/goals
// #access private
const  getGoals = asyncHandler(async (req, res)=>{
    const goals = await Goal.find({user: req.user.id});


    res.json(goals);
})

// @desc set goals
// #route post /api/goals
// #access private
const  setGoal = asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please add text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.json(goal);
})

// @desc update goals
// #route PUT /api/goals
// #access private
const  updateGoal = asyncHandler(async (req,res)=>{

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // check user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // User matches goal user
    if (goal.user.toString()  !== req.user.id ) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })
    res.json(updatedGoal);
})

// @desc delete goals
// #route del /api/goals
// #access private
const  deleteGoal = asyncHandler(async (req,res)=>{

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal was not found')
    }
    
    // const user = await User.findById(req.user.id);

    // check user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }
    // User matches goal user
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    
    await goal.remove()
    
    res.json({id:req.params.id});
})

module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}