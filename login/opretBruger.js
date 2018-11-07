//variabler
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var brugerNavnInput = document.getElementById("brugernavn");
var brugerPassInput = document.getElementById("kodeord");
var brugerRolleInput = document.getElementById("roller").selectedIndex;

//URL
var url = "mongodb://localhost:27017/";

//Forbindelsen til MongoDB
MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
    if (err){throw err};
    var dbo = db.db("dbSprog");
    var myobj = [{username: brugerNavnInput, password: brugerPassInput, privilege: brugerRolleInput}];
    dbo.collection("brugere").insertMany(myobj, function(err, res){
        if (err){throw err};
        console.log("Document inserted");
        db.close();
    });
});