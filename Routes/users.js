var express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
var router = express.Router();
const userModel = require("../Models/user.model");
const userController = require('../controllers/user.controller');

/* GET all Users. */
router.get('/all', userController.getAllUsers);

/* Get specific user. */
router.get('/:email', userController.getUserDetails);

/* Get specific user. */
router.post('/signup', userController.signup);

// Login route
router.post('/login',userController.login);

  
module.exports = router;