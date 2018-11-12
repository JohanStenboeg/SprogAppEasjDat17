var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
 var multer = require('multer');
var upload = multer({dest: "./public/uploads"});
// var Ord = require('../models/ordbogModel');

mongoose.connect('mongodb://localhost:27017/tododb', { useNewUrlParser: true });
var ordbogModel = require('../models/ordbogModel');
var ordbog = mongoose.model('Ordbog', ordbogModel.ordbogSchema, 'ordbog');

/*
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, new Date() + '-' + file.originalname);
  }
});

var fileFilter = (req, file, callback) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}


var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});
*/

// Get handler som henter tilfojord siden
router.get('/tilfojord', function(req, res, next){
  res.render('tilfojord');
});

/* GET handler som henter ordbog siden med ordene */
router.get('/', function (req, res, next) {

  ordbog.find({}, function (err, result) {
    if (err) return console.log(err);
    res.render('ordbog', result);
  });
});

// GET handler som henter ét ord ud fra _id 
// Da req.params._id ikke virker efter hensigten, vælger jeg at finde URL på en anden måde
var url = require('url');

router.get('/:id', function(req, res, next){
  //var reqToString = url.parse(req.originalUrl, true);
  //var reqObject = reqToString.query;
  console.log(req.param('id'));

  ordbog.findById(req.param('id'), function(err, result){
    if(err){ return console.log(err);
    } else{
      res.render('visord', result);
      console.log(req.param('id'));
    }
  });
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


// Mangler at blive tested
/* Handler der updater et ord i ordbogen. Image, sound og video mangler at arbejdes på */
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


// Mangler at blive testet
/* Handler der sletter et ord i ordbogen. Image, sound og video mangler at arbejdes på */
router.post('/slet_ord', function (req, res, next) {

  ordbog.findOneAndDelete(req.params._id, function (err, ord) {
    if (err) return console.log(err);

    res.redirect('../test');
  });
});

/*
router.post('/uploadimage2', upload.single('image'), function (req, res, next) {
  const ord = new Ord({
    _id: new mongoose.Types.ObjectId(),
    ord: req.body.ord,
  });
  ord
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created ord successfully",
        createdOrd: {
          ord: result.ord,
          image: result.image,
          _id: result._id,
          request: {
            type: 'GET',
            url: "http://localhost:3000/ordbog/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
*/



router.post('/uploadimage', upload.single('image'), function (req, res) {
  if (req.file) {
    res.json(req.file);
  }
  else throw 'error';
})




module.exports = router;