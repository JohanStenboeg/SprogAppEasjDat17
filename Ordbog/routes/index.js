var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";

/* Handler GET request og henter alle objects i ordbogen */
router.get('/api/getord', function(req, res, next) {
 
  MongoClient.connect(url,{ useNewUrlParser: true } , function(err, db) {
    if (err) throw err;
    let database = db.db("tododb");
    database.collection("ordbog").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });

});

/* Handler POST request og indsætter et ord i ordbogen, gem af image, sound og video mangler at arbejdes på */
router.post('/api/postord', function(req, res, next) {

  MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
    if (err) throw err;
    let database = db.db("tododb");

    let object = {
      ord: req.body.ord,
      sprog: "dk",
      user: "fra_index/test",
      kategori: req.body.kategori,
      date: req.body.date,
      image: req.body.image,
      sound: req.body.sound, 
      video: req.body.video
    }

    database.collection("ordbog").insertOne(object, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted-index_insertOne_used");
      db.close();
    });
    res.send("1 document inserted-index_insertOne_used");
  });

});

/* Handler POST request og opdaterer et ord i ordbogen */
router.post('/api/updateord', function(req, res, next) {

  MongoClient.connect(url,{ useNewUrlParser: true } , function(err, db) {
    if (err) throw err;
    let database = db.db("tododb");
    let myquery = { _id: ObjectId("5bdae053534f8e3eec70b571") };
    let newvalues = { $set: {ord: req.body.ord } };
    database.collection("ordbog").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated-index_updateOne_used");
      db.close();
    });
    res.send("1 document updated-index_updateOne_used");
  });
});

/* Handler POST request og opdaterer et image i ordbogen */
router.post('/api/updateimage', function(req, res, next) {
 

});

/* Handler POST request og opdaterer lyd i ordbogen */
router.post('/api/updatelyd', function(req, res, next) {

  

});

/* Handler POST request og opdaterer video i ordbogen */
router.post('/api/updatevideo', function(req, res, next) {

  

});

/* GET index. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SprogApp' });
});

module.exports = router;
