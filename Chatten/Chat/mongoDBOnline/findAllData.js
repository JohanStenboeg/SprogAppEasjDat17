
//Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb";

//Database navn: sprogAppChatDb
var dbNavn = "sprogappmongodb";
//Collection navn: c1
var collectionNavn = "chatBeskeder";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbNavn);
    dbo.collection(collectionNavn).find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        
    });

});