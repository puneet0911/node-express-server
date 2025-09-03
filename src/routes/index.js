var express = require('express');
const logger = require('../logger');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  logger.info('root requested all users');
  res.send('Welcome to our express app');
});

module.exports = router;
