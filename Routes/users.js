var express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
var router = express.Router();
const userModel = require("../Models/user.model");
const userController = require('../controllers/user.controller');

/* GET all Users. */
router.get('/all', async function(req, res, next) {
    try{
        const allUsers = await userModel.find()
        res.status(200).send({
            status: 'Success',
            data: allUsers,
        })
    }catch (error){
        console.log(" error ", error)
    }
});

/* Get specific user. */
router.get('/:email', async function(req, res, next) {
    try{
        const userRep = await userModel.find({email:req.params.email })
        res.status(200).send({
            status: 'Success',
            data: userRep,
        })
    }catch (error){
        console.log(" error ", error)
    }
});

/* Get specific user. */
router.post('/signup', userController.signup);

// Login route
router.post('/login',(req, res, next) => {
    
});

  
module.exports = router;