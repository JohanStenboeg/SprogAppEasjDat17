    //Opretter et MongoClient variabel og henter mongodb modulet
    var MongoClient = require('mongodb').MongoClient;

    //SprogAppChatDB = sacdb
    //Opretter variabel med url'en. 
    var url = "mongodb://localhost:27017/sprogAppChatDb";

    //Database navn: sprogAppChatDb
    var dbNavn = "sprogAppChatDb";
    //Collection navn: c1
    var collectionNavn = "c1";
    //Antal beskeder der skal printes

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
        });
    });
    