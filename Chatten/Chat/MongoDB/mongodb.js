

    //Opretter et MongoClient variabel og henter mongodb modulet
    var MongoClient = require('mongodb').MongoClient;

    //SprogAppChatDB = sacdb
    //Opretter variabel med url'en. 
    var url = "mongodb://localhost:27017/sprogAppChatDb";

    

    //Opretter forbindelse til serveren
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("sprogAppChatDb");
                dbo.createCollection("c1", function(err, res){
                if(err) throw err;
                console.log("Collection oprettet.");
                db.close();
                })
        })
    


