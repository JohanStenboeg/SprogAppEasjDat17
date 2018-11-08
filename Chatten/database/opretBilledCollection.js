
//Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://localhost:27017/sprogAppChatDb";

//Database navn: sprogAppChatDb
var dbNavn = "sprogAppChatDb";
//Collection navn for billed collection = "bc1";
var collectionNavn = "bc1";

//Readline, tillader consol input til valg af collection
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  //Spørger hvilken collection man vil søge i
  readline.question(`What Collection do you want to create? `, (collectionNavn) => {
      //Så kører den database forbindelsen til den collection man har valgt i consollen
     MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbNavn);
    //Den finder collectionen og tager alt ud af den. 
    dbo.createCollection(collectionNavn, function (err, res) {
    if (err) throw err;
    var jsonEnkelt = {billednavn:"Initial", billedref:"Input"};
    //Vælger hvilken collection der skal indsættes data i og insætter data. 
    dbo.collection(collectionNavn).insertOne(jsonEnkelt, function(err, db){
        if(err) throw err;
    });
    console.log("Collection " + collectionNavn + " oprettet.");
    db.close();
    });

}); 
    readline.close()
  })






