var express = require('express');
var router = express.Router();

/* GET handler, som henter test siden */
router.get('/', function (req, res, next) {
    res.render('test');
  }) 
  
  module.exports = router;