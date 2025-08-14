var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');


/* Get specific user. */
router.get('/:email', userController.getUserDetails);

/* Get specific user. */
router.post('/signup', userController.signup);

// Login route
router.post('/login',userController.login);

  
module.exports = router;