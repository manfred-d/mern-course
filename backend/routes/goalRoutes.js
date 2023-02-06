const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')

// importing controllers
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controller/goalController')

// routes
router.route('/').get(protect,getGoals).post(protect,setGoal)

router.route("/:id").put(protect,updateGoal).delete(protect,deleteGoal);

module.exports = router