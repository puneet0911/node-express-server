var express = require('express');
var router = express.Router();
const adminUserController = require('../controllers/adminUser.controller');

/* GET all Users. */
router.get('/users/all', adminUserController.getUserList);   


module.exports = router;
