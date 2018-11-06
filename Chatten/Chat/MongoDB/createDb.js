

//Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://localhost:27017/sprogAppChatDb";

//Database navn: sprogAppChatDb
var dbNavn = "sprogAppChatDb";
//Collection navn: c1
var collectionNavn = "c1";



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

/*MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("sprogAppChatDb");
    var json = [
        { brugernavn: 'JohanTest', besked: 'Hej, dette er en test' },
        { brugernavn: 'JohanTest2', besked: 'Hej, dette er en test2' },
        { brugernavn: 'JohanTest3', besked: 'Hej, dette er en test3' },
        { brugernavn: 'JohanTest4', besked: 'Hej, dette er en test4' }
    ];
    dbo.collection("c1").insertMany(json, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});
*/