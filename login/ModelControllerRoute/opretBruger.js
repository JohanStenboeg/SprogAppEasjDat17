//Variabler til moduler der skal bruges
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

//router forbinder til css
router.use('/css/style.css', function(req, res){
    res.sendFile(__dirname + '/css/style.css');
});
//router der forbinder til fortryd-knappen
router.use('/billeder/logout.png', function(req, res){
    res.sendFile(__dirname + '/billeder/logout.png');
});

//Forbind til mongoDB vha. mongoose modulet.
mongoose.connect('mongodb://localhost:27017/dbSprog', {useNewUrlParser: true});
//Fortæller hvilket Model den skal hente og bruge
var BrugerModel = require('../ModelControllerRoute/brugerModel');
//Fortæller hvilken collection i MongoDB der skal bruges
var bruger = mongoose.model('Bruger', BrugerModel.BrugerSchema, 'brugere');

//Laver en POST forespørgsel på siden, og indsætter indhold i databasen fra sidens indhold
router.post('/register', function(req, res, next){
    //lokal variabel til at skabe et objekt, som databasen kan læse fra
    let object = {
        brugernavn : req.body.brugernavn,
        kodeord : req.body.kodeord,
        rolle : req.body.rolle,
        rewardLvL : 0
    }
    //opret brugeren
    bruger.create(object, function(err){
        if(err){return console.log(err)}
    });
    //send mig til opret-siden
    res.redirect('/opretBruger');
});

//udsend scriptet
module.exports = router;