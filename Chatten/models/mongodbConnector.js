let mongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";
var database;

// Virker ikke endnu som forventet
// Mulig løsning https://stackoverflow.com/questions/34566049/express-js-mongodb-referenceerror-db-is-not-defined-when-db-is-mentioned-out


mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    database = db.db('tododb');
    database.createCollection("sprogmakker", function (err, res) {
        console.log("Collection created!");
        db.close();
    });
});

function test() {
    database.createCollection("customers", function (err, res) {
        console.log("Collection created!");
        db.close();
    });
}




