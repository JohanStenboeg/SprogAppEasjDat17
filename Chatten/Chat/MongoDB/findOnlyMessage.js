//Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://localhost:27017/";

//Database navn: sprogAppChatDb
var dbNavn = "sprogAppChatDb";
//Collection navn: c1
var collectionNavn = "c1";
//Antal beskeder der skal printes
var collectionHentAntalBeskeder = 1;

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbNavn);
    dbo.collection(collectionNavn).find({ brugernavn:"JohanTest"}).project({ _id: 0, brugernavn: 0 }).sort({$natural:-1}).limit(collectionHentAntalBeskeder).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});