var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET handler som henter ordbog siden med ordene */
router.get('/', function (req, res, next) {

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    let database = db.db("tododb");
    database.collection("ordbog").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('ordbog' , result);
      db.close();
    });
  });

});

/* Handler POST request og indsætter et ord i ordbogen, gem af image, sound og video mangler at arbejdes på */
router.post('/postord', function(req, res, next) {

  MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
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

    database.collection("ordbog").insertOne(object, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });

    database.collection("ordbog").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.render('ordbog' , result);
      db.close();
    });
  });

  });


module.exports = router;
