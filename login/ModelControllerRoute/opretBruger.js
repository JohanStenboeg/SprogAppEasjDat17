//Variabler til moduler der skal bruges
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
//var __dirname = 'localhost:8080/login';

//router forbinder til css
router.use('/css/stylelogin.css', function(req, res){
    res.sendFile(__dirname + '/css/stylelogin.css');
});
//router der forbinder til fortryd-knappen
router.use('/billeder/logout.png', function(req, res){
    res.sendFile(__dirname + '/billeder/logout.png');
});

//Forbind til mongoDB vha. mongoose modulet.
mongoose.connect('mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb', {useNewUrlParser: true});
//Fortæller hvilket Model den skal hente og bruge
var BrugerModel = require('../ModelControllerRoute/brugerModel');
//Fortæller hvilken collection i MongoDB der skal bruges
var bruger = mongoose.model('Bruger', BrugerModel.BrugerSchema, 'brugere');

//Laver en POST forespørgsel på siden, og indsætter indhold i databasen fra sidens indhold
router.post('/register', function(req, res, next){
    var kontaktTemp = "fejl";

    if (req.body.contact == "") {
        kontaktTemp = "ingen makker knyttet til"
    } else{ 
        kontaktTemp = req.body.contact
    }


    //lokal variabel til at skabe et objekt, som databasen kan læse fra
    let object = {
        username : req.body.brugernavn,
        password : req.body.kodeord,
        privilege : req.body.rolle,
        rewardLVL : 0,
        contact : kontaktTemp
    }
    //opret brugeren
    bruger.create(object, function(err){
        if(err){return console.log(err)}
    });
    //send mig til opret-siden
    res.redirect('/');
});

//udsend scriptet
module.exports = router;