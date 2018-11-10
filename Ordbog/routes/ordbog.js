var express = require('express');
var router = express.Router();
//var hbs = require('hbs');
//hbs.registerPartials(__dirname + '/views/partials');
var mongoose = require('mongoose');
// var multer = require('multer');
//var upload = multer({dest: "./public/uploads"});
// var Ord = require('../models/ordbogModel');
mongoose.connect('mongodb://localhost:27017/tododb', { useNewUrlParser: true });
var ordbogModel = require('../models/ordbogModel');
var ordbog = mongoose.model('Ordbog', ordbogModel.ordbogSchema, 'ordbog');

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
    user: "fra_ordbog/test",
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

  ordbog.findByIdAndRemove(req.params._id, function (err, ord) {
    if (err) return console.log(err);

    res.redirect('../ordbog');
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


/*
router.post('/uploadimage', upload.single('image'), function (req, res) {
  if (req.file) {
    res.json(req.file);
  }
  else throw 'error';
})
*/



module.exports = router;