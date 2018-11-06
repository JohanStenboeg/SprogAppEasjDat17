//Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://localhost:27017/";

//Database navn: sprogAppChatDb
var dbNavn = "sprogAppChatDb";
//Collection navn: c1
var collectionNavn = "c1";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbNavn);
    var query = { _id: "JS511" };
    dbo.collection(collectionNavn).find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});

