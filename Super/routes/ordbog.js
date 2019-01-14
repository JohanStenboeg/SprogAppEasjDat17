var express = require('express');
var router = express.Router();
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb";

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

  if (file.mimetype === 'audio/aac' || file.mimetype === 'audio/ac3' || file.mimetype === 'audio/AMR' || file.mimetype === 'audio/AMR-WB' || file.mimetype === 'audio/amr-wb+' || file.mimetype === 'audio/flac') {
    callback(null, true);
  } else {
    callback(null, false);
  }

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

});


var videostorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/videouploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);

  }
});

var videofileFilter = (req, file, callback) => {
  // reject a file
  if (file.mimetype === 'video/x-flv' || file.mimetype === 'video/mp4' || file.mimetype === 'application/x-mpegURL' || file.mimetype === 'video/MP2T' || file.mimetype === 'video/3gpp' || file.mimetype === 'video/quicktime' || file.mimetype === 'video/x-msvideo' || file.mimetype === 'video/x-ms-wmv') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

var videoupload = multer({
  storage: videostorage,

  limits: {
    fileSize: 1024 * 1024 * 500
  },
  fileFilter: videofileFilter
});

router.post('/uploadvideo', videoupload.single('video'), function (req, res) {

  res.json(req.file);

});

/* GET handler som henter ordbog siden med ordene */
router.get('/', function (req, res, next) {

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("");
    dbo.collection("ordbog").find({}).sort('ord', 1).toArray(function (err, result) {
      if (err) throw err;
      db.close();

      for (let i = 0; i < result.length; i++) {
        if (result[i].image == "") {
          result[i].image = "images/defaultPicture.PNG";
        }
      }

      res.render('ordbog', result);
    });
  });
});

/* Handler POST request og indsætter et ord i ordbogen, gem af image, sound og video mangler at arbejdes på */
router.post('/postord', imageupload.single('image'), function (req, res, next) {

  let imagePath, imagePathSliced;

  if (req.file == undefined) {
    imagePathSliced = "";
  } else {
    imagePath = req.file.path;
    imagePathSliced = imagePath.slice(7);
  }

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("");

    let object = {
      ord: req.body.ord,
      sprog: "dk",
      user: "/user",
      kategori: req.body.kategori,
      date: "",
      image: imagePathSliced,
      sound: "",
      video: ""
    }

    dbo.collection("ordbog").insertOne(object, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });

    res.redirect('../ordbog');
  });
});

router.get('/seneste', function (req, res, next) {

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("");
    dbo.collection("ordbog").find({}).sort({ $natural: -1 }).limit(3).toArray(function (err, result) {
      if (err) throw err;
      db.close();

      for (let i = 0; i < result.length; i++) {
        if (result[i].image == "") {
          result[i].image = "../images/defaultPicture.PNG";
        }
      }

      res.render('seneste', result);
    });
  });
});

/* Handler GET request og henter tilfojord siden. */
router.get('/tilfojord', function (req, res, next) {

  res.render('tilfojord');

});


/* Handler POST request og opdaterer et ord i ordbogen */
router.post('/updateord', function (req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

    if (err) throw err;

    let database = db.db("");

    let myquery = { ord: req.body.ord };

    let newvalues = { $set: { ord: req.body.nyt_ord } };

    database.collection('ordbog').updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
    res.send("1 document updated-index_updateOne_used");
    res.redirect('/ordbog');
    //    res.redirect('/test'); //Dur ikke her, da det ikke er en function!
  });
});

/* Handler GET request og sletter ordet i ordbogen ved hjælp af id */
router.get('/slet_ord/:id', function (req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("");

    var myquery = { _id: ObjectId(req.params.id) };

    dbo.collection("ordbog").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
    res.redirect('/ordbog');
  });
});

module.exports = router;