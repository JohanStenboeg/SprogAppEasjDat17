/*function show_image(imgName, cN, alt){
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    document.body.appendChild(img)
}   
   
   */
   
   
   //Opretter et MongoClient variabel og henter mongodb modulet
    var MongoClient = require('mongodb').MongoClient;

    //SprogAppChatDB = sacdb
    //Opretter variabel med url'en. 
    var url = "mongodb://localhost:27017/sprogAppChatDb";

    //Database navn: sprogAppChatDb
    var dbNavn = "sprogAppChatDb";
    //Collection navn: c1
    var collectionNavn = "cb1";

    //Readline, tillader consol input til valg af collection
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  //Spørger hvilken collection man vil søge i
  readline.question(`What Collection do you want to insert picture reference into? `, (collectionNavn) => {
       //Spørger hvilken collection man vil søge i
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
    if(err) throw err;
    //Database navnet den skal connecte til
    var dbo = db.db(dbNavn);
    //Jsonfilen der skal insættes i databasen
    var billedrefen = "https://www.dropbox.com/home/SprogApp2018?preview=waifu.jpg";
    var jsonEnkelt = {billednavn:"test01", billedref:billedrefen}
    //Vælger hvilken collection der skal indsættes data i og insætter data. 
    dbo.collection(collectionNavn).insertOne(jsonEnkelt, function(err, db){
        if(err) throw err;
    });
    });

});
//Chatten\Billeder\waifu.jpg
