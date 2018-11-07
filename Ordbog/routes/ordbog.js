var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tododb', {
  useNewUrlParser: true
});
var ordbogModel = require('../models/ordbogModel');
var ordbog = mongoose.model('Ordbog', ordbogModel.ordbogSchema, 'ordbog');

/* GET handler som henter ordbog siden med ordene */
router.get('/', function (req, res, next) {

  ordbog.find({}, function (err, result) {
    if (err) return console.log(err);
    res.render('ordbog', result);
  });
});

/* Handler POST request og indsætter et ord i ordbogen, gem af image, sound og video mangler at arbejdes på */
router.post('/postord', function (req, res, next) {

  let object = {
    ord: req.body.ord,
    sprog: "dk",
    user: "erik2310",
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

/* Handler der updater request og updater et ord i ordbogen. Image, sound og video mangler at arbejdes på */

router.post('/updateord', function (req, res, next) {

  var id = mongoose.Types.ObjectId(req.query._id);

  ordbog.findOneAndUpdate({
    _id: id
  }, req.body, {
    new: true
  }, function (err, ord) {

    if (err) return console.log(err);
  })
  res.redirect('../ordbog');
});

/* Handler der sletter et ord i ordbogen. Image, sound og video mangler at arbejdes på */
router.post('/slet', function(req, res, next) {

ordbog.findByIdAndRemove(req.params._id, function (err, ord) {
  if (err) return console.log(err);

res.redirect('../ordbog');
})
});

module.exports = router;