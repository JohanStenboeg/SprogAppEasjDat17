var express = require('express');
var router = express.Router();
//var hbs = require('hbs');
//hbs.registerPartials(__dirname + '/views/partials');
var mongoose = require('mongoose');
var multer = require('multer');
//var upload = multer({dest: "./public/uploads"});
var Ord = require('../models/ordbogModel');

/* GET handler, som henter test siden */
router.get('/', function (req, res, next) {
  res.render('test');
}) 

mongoose.connect('mongodb://localhost:27017/tododb', { useNewUrlParser: true });
var ordbogModel = require('../models/ordbogModel');
var ordbog = mongoose.model('Ordbog', ordbogModel.ordbogSchema, 'ordbog');


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
    /* callback(null, '_' + new Date().toUTCString() +  file.originalname); */
  }
});

const fileFilter = (req, file, callback) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    filesize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});

router.post('/uploadimage', upload.single('image'), function (req, res) {
  if (req.file) {
    res.json(req.file);
  }
  else throw 'error';
});

/* GET handler som henter ordbog siden med ordene */
router.get('/', function (req, res, next) {

  ordbog.find({}, function (err, result) {
    if (err) return console.log(err);
    res.render('ordbog', result);
  });
});

/* GET handler som henter ét ord ud fra _id */
/*router.get('/:id', function(req, res){
var currentOrd = document.
});*/

/* Handler POST request og indsætter et ord i ordbogen, gem af image, sound og video mangler at arbejdes på */
router.post('/postord', function (req, res, next) {

  let object = {
    ord: req.body.ord,
    sprog: "dk",
    user: "/user",
    kategori: "",
    date: "",
    image: "",
    sound: "",
    video: ""
  }

  ordbog.create(object, function (err) {
    if (err) return console.log(err);
  })
  res.redirect('../ordbog');
});

  
/* Handler POST request og opdaterer et ord i ordbogen */
router.post('/updateord', function (req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    
    if (err) throw err;
    
    let database = db.db("tododb");
    
    let myquery = { ord: req.body.ord };
    
    let newvalues = { $set: { ord: req.body.nyt_ord } };
    
    database.collection('ordbog').updateOne( myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
    res.send("1 document updated-index_updateOne_used");
     //   res.redirect('/ordbog');
        res.redirect('/test'); 
    });
  });

/* Handler POST sletter et ord i ordbogen */
router.post('/slet_ord', function (req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    let database = db.db("tododb");

//    database.collection('ordbog').remove({ _id: ObjectId(req.params._id) }, (err, result) => {
      database.collection('ordbog').findOne({ _id: ObjectId(req.params._id) }, (err, result) => {
        if (err) return console.log(err);
        console.log(req.body);

        database.collection('ordbog').deleteOne(req.body, (err, result) => {
          if (err) return console.log(err);  
        res.redirect('/test');
      });
    });
  });
}); 


  module.exports = router;