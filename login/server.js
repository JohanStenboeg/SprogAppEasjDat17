

//https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

//Note to self: killall -9 node ---listen EADDRINUSE :::8080

//HUSK AT START MONGOD før programmet køres.
//-->sudo service mongod start<--
//-->sudo service mongod stop<--

//programmet køres med >npm run start<
var clienttoserver = require('./clienttoserver')
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
  
/**ROUTES TIL SCRIPTS */
var opretRouter = require('./ModelControllerRoute/opretBruger');
//var loginRouter = require('./Clientside/logintoServer');

/**ENDPOINTS */
//henter indhold til opretBruger endpoint
app.get('/opretBruger', function(req, res){
  res.sendFile(path.join(__dirname + '/views/opretBruger.html'));
});
//henter indhold til Index (login) endpoint
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/Clientside/login.html'));
});
//henter indhold til KursistSide endpoint
app.get('/kursistside', function(req, res){
  res.sendFile(path.join(__dirname + '/menu/kursist/kursistside.html'));
});
//henter indhold til SprogmakkerSide endpoint
app.get('/sprogmakkerside', function(req, res){
  res.sendFile(path.join(__dirname + '/menu/sprogmakker/sprogmakkerside.html'));
});
//henter indhold til UnderviserSide endpoint
app.get('/underviserside', function(req, res){
  res.sendFile(path.join(__dirname + '/menu/underviser/underviserside.html'));
});
//henter indhold til Kursist + ID endpoint
app.get('/Kursist' /* + et ID */, function(req, res){
  res.sendFile(path.join(__dirname + '/Profil/kursist/Kursist.html'));
});
//henter indhold til Sprogmakker + ID endpoint
app.get('/Sprogmakker' /* + et ID */, function(req, res){
  res.sendFile(path.join(__dirname + '/Profil/sprogmakker/Sprogmakker.html'));
});
//henter indhold til Underviser + ID endpoint
app.get('/Underviser' /* + et ID */, function(req, res){
  res.sendFile(path.join(__dirname + '/Profil/underviser/Underviser.html'));
});

/**STYLESHEET */
app.use('/css/style.css', function(req, res){
  res.sendFile(__dirname + '/css/style.css');
});

/**CONTENT / PICTURES / ETC */
app.use('/billeder/logout.png', function(req, res){
  res.sendFile(__dirname + '/billeder/logout.png')
});
app.use('/billeder/camera.png', function(req, res){
  res.sendFile(__dirname + '/billeder/camera.png')
});
app.use('/billeder/tilbage_knap.png', function(req, res){
  res.sendFile(__dirname + '/billeder/tilbage_knap.png')
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//fixer Cross-Origin Resource Sharing (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


  //var routes = require('../ModelControllerRoute/routes'); //importing route
//routes(app); //register the route


app.route('/').post(clienttoserver.login_as_client)

//Fortæller hvilket route skal hentes indhold fra, og hente scripts fra
app.use('/opretBruger', opretRouter);
//app.use('/login', loginRouter);

//Middleware : Skriver hvis den ikke kan finde siden.
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });


app.listen(8080,function(){
  console.log("Started on PORT 8080");
})



console.log('todo list RESTful API server started on: ' + port);
