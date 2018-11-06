

//https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

//Note to self: killall -9 node ---listen EADDRINUSE :::3000

//HUSK AT START MONGOD før programmet køres.
//-->sudo service mongod start<--
//-->sudo service mongod stop<--

//programmet køres med >npm run start<
var clienttoserver = require('./clienttoserver')
var bodyParser     =   require("body-parser");
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  //Client = require('../ModelControllerRoute/clientModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb',{ useNewUrlParser: true }); 


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


app.route('/login').post(clienttoserver.login_as_client)

 

//Middleware : Skriver hvis den ikke kan finde siden.
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });


app.listen(3000,function(){
  console.log("Started on PORT 3000");
})



console.log('todo list RESTful API server started on: ' + port);
