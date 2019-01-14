var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ordbogModel = require('../models/ordbogModel');
var ordbog = mongoose.model('Ordbog', ordbogModel.ordbogSchema, 'ordbog');
mongoose.connect('mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb', {  useNewUrlParser: true });

router.get('/', function(req, res, next){
    res.render('tilfojord');
});

/* Handler POST request og indsætter et ord i ordbogen, gem af image, sound og video mangler at arbejdes på */
router.post('/postord', function (req, res, next) {

    let object = {
      ord: req.body.ord,
      sprog: "dk",
      user: "/user",
      image: "",
      sound: "",
      video: "",
      kategori: "",
      date: ""
    }
  
    ordbog.create(object, function (err) {
      if (err) return console.log(err);
    })
    res.redirect('../ordbog');
  });
  
  module.exports = router;