var express = require('express');
var router = express.Router();
//var hbs = require('hbs');
//hbs.registerPartials(__dirname + '/views/partials');
var mongoose = require('mongoose');
var multer = require('multer');
//var upload = multer({dest: "./public/uploads"});
var Ord = require('../models/ordbogModel');
mongoose.connect('mongodb://localhost:27017/tododb', { useNewUrlParser: true });
var ordbogModel = require('../models/ordbogModel');
var ordbog = mongoose.model('Ordbog', ordbogModel.ordbogSchema, 'ordbog');


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.file.originalname);
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

router.post('/uploadimage', upload.single('image'), function (req, res) {
  if (req.file) {
    res.json(req.file);
  }
  else throw 'error';
})


module.exports = router;