const express = require("express");
const router = express.Router();
const { registerUser,loginUser,getMe } = require('../controller/userController');

// protected routes
const {protect} = require('../middleware/authMiddleware')

// solving cors
router.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Headers","origin, x-Requested-with, Content-Type, Accept");
    next();
});

router.post('/', registerUser)
router.post("/login", loginUser);
router.get("/me",protect, getMe);

module.exports = router;