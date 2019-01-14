
    //Opretter et MongoClient variabel og henter mongodb modulet
    var MongoClient = require('mongodb').MongoClient;

    //SprogAppChatDB = sacdb
    //Opretter variabel med url'en. 
    var url = "mongodb://localhost:27017/sprogAppChatDb";

    //Database navn: sprogAppChatDb
    var dbNavn = "sprogAppChatDb";
    //Collection navn: c1
    var collectionNavn = "c1";

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
        if(err) throw err;
        var dbo = db.db(dbNavn);
        var json = [
            {brugernavn : 'JohanTest', besked : 'Hej, dette er en test'},
            {brugernavn : 'JohanTest', besked : 'Hej, dette er en test2'},
            {brugernavn : 'JohanTest', besked : 'Hej, dette er en test3'},
            {brugernavn : 'JohanTest', besked : 'Hej, dette er en test4'},
            {brugernavn : 'JohanTest', besked : 'Hej, dette er en test5'}
        ];
        dbo.collection(collectionNavn).insertMany(json, function(err, res){
            if(err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            console.log(res);
            
            db.close();
        });
    });