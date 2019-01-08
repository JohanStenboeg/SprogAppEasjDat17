var dbfind = require('./dbfind')
exports.login_as_client = function(req, res){
    var user_name=req.body.brugernavn;
    var password_in=req.body.password;
    var score_record = req.body.score;
    //test login system
    //var x = dbfind.searchDB(user_name,password_in);
    //console.log(x)
    
    //res.send(x)
    console.log("Forbindelse oprettet")

    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var brugernavn = user_name; 
var password = password_in;

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("dbSprog");
  dbo.collection("brugere").find({username : brugernavn, password : password},{projection : {_id : 0,}}).toArray(function(err, result) {
    if (err) throw err;
    if(result !== 'undefined' && result[0] !== 'undefined') {
      console.log(result[0].username + " loggede ind!");
      var profilDataResponse = {};

      profilDataResponse.username = result[0].username;
      profilDataResponse.kodeord = result[0].password;
      profilDataResponse.privilege = result[0].privilege;
      profilDataResponse.score = result[0].rewardLVL;
      profilDataResponse.contact = result[0].contact;

      responseString = JSON.stringify(profilDataResponse);

    
      //privilege = result[0].privilege;
    }
    db.close();
    //console.log(result.length);
    if (result.length == 0){
      console.log("Noget gik galt i ClientToServer!")
      res.send("fejl");
    }
    else{
      res.send(responseString);
    }
  });
});


};
    