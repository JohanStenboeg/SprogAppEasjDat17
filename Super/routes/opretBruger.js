//Variabler til moduler der skal bruges
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
//var __dirname = 'localhost:8080/login';


//Forbind til mongoDB vha. mongoose modulet.
mongoose.connect('mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb', {useNewUrlParser: true});
//Fortæller hvilket Model den skal hente og bruge
var BrugerModel = require('../models/brugerModel');
//Fortæller hvilken collection i MongoDB der skal bruges
var bruger = mongoose.model('Bruger', BrugerModel.BrugerSchema, 'brugere');

//Laver en POST forespørgsel på siden, og indsætter indhold i databasen fra sidens indhold
router.post('/register', function(req, res, next){
    //lokal variabel til at skabe et objekt, som databasen kan læse fra
    let object = {
        brugernavn : req.body.brugernavn,
        kodeord : req.body.kodeord,
        rolle : req.body.rolle,
        rewardLvL : 0,
        contact : req.body.contact
    }
    //opret brugeren
    bruger.create(object, function(err){
        if(err){return console.log(err)}
    });
    //send mig til opret-siden
    res.redirect('https://sprogapp.appspot.com/login');
});

//udsend scriptet
module.exports = router;