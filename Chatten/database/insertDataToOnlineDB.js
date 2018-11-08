




const MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://Stenboeg:sprogapp201825@cluster0-zb7lw.mongodb.net/test?authSource=yourDB&w=1";
MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    console.log(encodeURIComponent("sprogapp2018%"))
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});

/*
//mongodb+srv://Stenboeg:<PASSWORD>@cluster0-zb7lw.mongodb.net/test?retryWrites=true

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
        dbo.collection(collectionNavn).find({ brugernavn:"JohanTest"}).project({ besked: 0, brugernavn: 0 }).sort({$natural:-1}).limit(collectionHentAntalBeskeder).toArray(function (err, result) {
            if (err) throw err;
            //Printer i konsollen. 
            console.log(result);
        });
    });
});
*/