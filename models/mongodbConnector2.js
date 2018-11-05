var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tododb";

// Virker ikke endnu som forventet

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    console.log("database connected!");
    db.close();
  });

  