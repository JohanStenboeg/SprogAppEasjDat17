
//Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb";

//Database navn: sprogAppChatDb
var dbNavn = "sprogappmongodb";
//Collection navn
var collectionNavn = "brugere"; //Skriv navnet på den collection der skal indsættes data i


//Connecting til databasen
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
    if(err) throw err;
    //Database navnet den skal connecte til
    var dbo = db.db(dbNavn);

    
    //Jsonfilen der skal insættes i databasen
    var jsonEnkelt = {brugernavn:"JohanTest", besked:"Dette er en test"};

    //Vælger hvilken collection der skal indsættes data i og insætter data. 
    dbo.collection(collectionNavn).insertOne(jsonEnkelt, function(err, db){
        if(err) throw err;
        //Finder id'et for den indsatte værdi i json objektet og printer det i consollen. 
        });
    });