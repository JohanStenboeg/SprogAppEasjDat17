var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dbSprog");
    dbo.createCollection("brugere", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });