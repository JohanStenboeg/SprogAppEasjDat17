const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
var url = "mongodb://localhost:27017/";


MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("dbSprog");
  var myobj = [{ username: 'Test123', password: 'Test123' }];
  dbo.collection("brugere").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

  //const db = client.db(dbName);
  //db.collection("brugere").find({}).toArray(function(err, result){
    //if(err) throw err;
    //console.log(result);
    //client.close();
//});