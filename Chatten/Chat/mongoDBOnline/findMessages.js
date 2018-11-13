
//Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb";

//Database navn: sprogAppChatDb
var dbNavn = "sprogappmongodb";
//Collection navn
var collectionNavn = "chatBeskeder"; //Skriv navnet på den collection der skal indsættes data i
//Antal beskeder der skal printes
var collectionHentAntalBeskeder = 10000;

var brugernavnet = "FrankHans"


MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbNavn);
    dbo.collection(collectionNavn).find({ brugernavn:brugernavnet}).project({ _id: 0, brugernavn: 0 }).sort({$natural:1}).limit(collectionHentAntalBeskeder).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});