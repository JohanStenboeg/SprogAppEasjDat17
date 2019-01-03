var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";
mongoose.connect('mongodb://localhost/ordbog');


// Laver en forbindelse til vores database og bruger den nye URL Parser
mongoose.connect('mongodb://localhost:27017/tododb', { useNewUrlParser: true });
 
// Importerer ordbogModel module
var ordbogModel = require('../models/ordbogModel');

// Kompilerer det til et ordbog objekt, som bruger vores ordbogSchema og ordbog collection */
var ordbog = mongoose.model('Ordbog', ordbogModel.ordbogSchema, 'ordbog');


var imagestorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/imageuploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
    
  }
});

var imagefileFilter = (req, file, callback) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

var imageupload = multer({
  storage: imagestorage,
  
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: imagefileFilter
});

router.post('/uploadimage', imageupload.single('image'), function (req, res) {
  
    res.json(req.file);
 
});


var audiostorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/audiouploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
    
  }
});

var audiofileFilter = (req, file, callback) => {
  // reject a file
  
    callback(null, true);
  
}

var audioupload = multer({
  storage: audiostorage,
  
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: audiofileFilter
});


router.post('/uploadaudio', audioupload.single('audio'), function (req, res) {
  
    res.json(req.file);
 
})


/* GET handler som henter ordbog siden med ordene */
router.get('/', function (req, res, next) {

  ordbog.find({}, function (err, result) {
    if (err) return console.log(err);
    res.render('ordbog', result);
  });
});  

 
// GET handler som henter ét ord ud fra _id 
// Da req.params._id ikke virker efter hensigten, vælger jeg at finde URL på en anden måde */

router.post('/vis', function(req, res, next){
  //var reqToString = url.parse(req.originalUrl, true);
  //var reqObject = reqToString.query;
  //console.log(req.param('id'));

  ordbog.findById(req.body.id, function(err, result){
    if(err){ return console.log(err);
    } else{
      res.render('visord', result);
      console.log(req.body.id);
    }
  });
});

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


 // Fungerer ikke
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
/* 

 // Fungerer ikke
 /* Handler der sletter et ord i ordbogen. Image, sound og video mangler at arbejdes på 
router.post('/slet_ord', function (req, res, next) {

  ordbog.findOneAndDelete(req.params._id, function (err, ord) {
    if (err) return console.log(err);

    res.redirect('../test');
  });
});
 */

/* Handler GET request og henter alle objects i ordbogen */
router.get('/getord', function (req, res, next) {

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
router.post('/postord', function (req, res, next) {

  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    let database = db.db("tododb");

    let object = {
      ord: req.body.ord,
      sprog: "dk",
      user: "fra_ordbog",
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
        res.redirect('/ordbog');
    //    res.redirect('/test'); //Dur ikke her, da det ikke er en function!
    });
  });

// Hentet fra i fredags/lørdags -> FUNGERER! Finder og sletter!
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
        res.redirect('/ordbog');
      });
    });
  });
}); 

module.exports = router;