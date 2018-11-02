var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://Stenboeg:Stenboeg@cluster0.mongodb.net/SprogAppTest";
MongoClient.connect(uri, function(err, client) {
   const collection = client.db("SprogAppTest").collection("Brugere");
   // perform actions on the collection object
   client.close();
});