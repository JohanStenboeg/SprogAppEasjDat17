var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: "./public/uploads"});
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var mongodb = require('mongodb');
var url = "mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb";

/* Handler GET request og henter alle objects i ordbogen */
router.get('/api/getord', function (req, res, next) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    let database = db.db("tododb");
    database.collection("ordbog").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });

});

/* Handler POST request og indsætter et ord i ordbogen, gem af image, sound og video mangler at arbejdes på */
router.post('/api/postord', function (req, res, next) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    let database = db.db("tododb");

    let object = {
      ord: req.body.ord,
      sprog: "dk",
      user: "fra_index/test",
      kategori: "",
      date: "",
      image: "",
      sound: req.body.sound,
      video: req.body.video
    }

    database.collection("ordbog").insertOne(object, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted-index_insertOne_used");
      db.close();
    });
    res.send("1 document inserted-index_insertOne_used");
  });
});

/* Handler POST request og opdaterer et ord i ordbogen - fungerer ikke!*/
router.post('/api/updateord', function (req, res, next) {
  var item = {
    ord: req.body.ord,
  };
  var id = reg.body.id;
  
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    assert.equal(null, err);
    let database = db.db("tododb");
    database.collection("ordbog").updateOne(ord,  function (err, result) {
      if (err) throw err;
      console.log("1 document updated-index_updateOne_used: ");
      db.close();
    });
    res.send("1 document updated-index_updateOne_used");
  });
});

/* Handler POST sletter et ord i ordbogen - fungerer ikke! */
router.post('/slet_ord', function (req, res, next) {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    let database = db.db("tododb");

    database.collection('ordbog').remove({_id: mongodb.ObjectID( req.params.id)}, (err, result) => {
      if (err) return console.log(err)
      console.log(req.body)
      res.redirect('/ordbog')
    })
  })
});

/* Handler POST request og opdaterer et image i ordbogen */
router.post('/api/uploadimage', upload.single('image'), function (req, res) {
  if (req.file) {
    res.json(req.file);
  } else throw 'error';
});

/* Handler POST request og opdaterer lyd i ordbogen */
router.post('/api/updatelyd', function (req, res, next) {



});

/* Handler POST request og opdaterer video i ordbogen */
router.post('/api/updatevideo', function (req, res, next) {



});

/* GET index. */
/*router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'SprogApp'
  });
});
*/
/* let myquery = {
  _id: mongodb.ObjectID( req.params.id)
};
let newvalues = {
  $set: {
    ord: req.body.ord
  } */


module.exports = router;