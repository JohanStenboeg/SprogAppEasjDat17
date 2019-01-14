
//Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb";

//Database navn: sprogAppChatDb
var dbNavn = "sprogappmongodb";
//Collection navn: c1
var collectionNavn = "brugere";



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
        //Jsonfilen der skal insættes i databasen
        //var jsonEnkelt = {brugernavn:"JohanTest", besked:"Dette er en test"};
        var jsonEnkelt = {brugernavn:"Stenboeg", kodeord:"Stenboeg1234"};

        //Vælger hvilken collection der skal indsættes data i og insætter data. 
        dbo.collection(collectionNavn).insertOne(jsonEnkelt, function(err, db){
            if(err) throw err;
    })
});
});
