var express = require('express');
var router = express.Router();
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";

router.get('/:id', function (req, res, next) {

    MongoClient.connect(url, { useNewUrlParser: true } ,function (err, db) {
        if (err) throw err;
        var dbo = db.db("tododb");
        dbo.collection("ordbog").findOne({ _id: ObjectId(req.params.id) }, function (err, result) {
            if (err) throw err;

            console.log(req.params.id);

            res.render('redigerord', result);
            db.close();
        });
    });
});

router.post('/', function (req, res, next) {
    MongoClient.connect(url, { useNewUrlParser: true } , function (err, db) {
        if (err) throw err;
        var dbo = db.db("tododb");
        dbo.collection("ordbog").updateOne({ _id: ObjectId(req.body.id) }, { $set: { ord: req.body.ord, kategori: req.body.kategori }}, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close;

        
        });
        res.redirect('/ordbog');
    });
});

module.exports = router;