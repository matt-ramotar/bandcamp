const express = require('express');
const router = express.Router();

const { asyncHandler } = require('./utils');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'It\'s Band Time!' });
});

module.exports = router;
