var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tododb', { useNewUrlParser: true });
var ordbogModel = require('../models/ordbogModel');
var ordbog = mongoose.model('Ordbog', ordbogModel.ordbogSchema, 'ordbog');

/* GET handler som henter ordbog siden med ordene */
router.get('/', function (req, res, next) {
   
    ordbog.find({}, function(err, result) {
      if (err) return console.log(err);
      res.render('ordbog', result);

    });
    
  });



/* Handler POST request og indsætter et ord i ordbogen, gem af image, sound og video mangler at arbejdes på */
/* router.post('/postord', function (req, res, next) {

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    let database = db.db("tododb");

    let object = {
      ord: req.body.ord,
      sprog: "dk",
      user: "erik2310",
      image: "",
      sound: "",
      video: ""
    }

    database.collection("ordbog").insertOne(object, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  res.redirect('../ordbog');
});

*/

module.exports = router;
