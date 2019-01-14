var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb";
exports.searchDB = function(brugernavn,password){
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("dbSprog");
  dbo.collection("brugere").find({username : brugernavn, password : password},{projection : {_id : 0, username : 0,password : 0}}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    console.log(result.length)
    if (result.length == 0){
      console.log("Noget gik galt i dbFind")
      return "fejl"
    }
    else{
      return result;
    }
  });
});
};

