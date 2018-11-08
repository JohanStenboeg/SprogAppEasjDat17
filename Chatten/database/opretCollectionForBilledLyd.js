//Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://localhost:27017/sprogAppChatDb";

//Database navn: sprogAppChatDb
var dbNavn = "sprogAppChatDb";
//Collection navn: c1
var collectionNavn = "c2";



//Opretter forbindelse til serveren
//Opretter database og collection
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    //Skriver databasen er oprettet. 
    console.log("Database " + dbNavn + " Oprettet");
    var dbo = db.db(dbNavn);
    dbo.createCollection(collectionNavn, function (err, res) {
        if (err) throw err;
        console.log("Collection " + collectionNavn + " oprettet.");
        db.close();
    })
});