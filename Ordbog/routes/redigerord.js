var express = require('express');
var router = express.Router();
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

router.get('/:id', function (req, res, next) {

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("tododb");
      dbo.collection("ordbog").findOne({_id: ObjectId(req.params.id)}, function(err, result) {
        if (err) throw err;
        
        console.log(req.params.id);

        res.render('redigerord', result);
        db.close();
      });
    });
  });

module.exports = router;