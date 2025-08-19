var express = require('express');
var router = express.Router();
const adminUserController = require('../controllers/adminUser.controller');
const logger = require('../logger');

/* GET all Users. */
router.get('/users/all', (req, res, next) => {
  logger.info('Admin requested all users');
  adminUserController.getUserList(req, res, next);
});

module.exports = router;
