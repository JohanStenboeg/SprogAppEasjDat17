
//omega filen

//imports
// ordbog
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var hbs = require('hbs');
var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');
var ordbogRouter = require('./routes/ordbog');
var tilfojordRouter = require('./routes/tilfojord');
var visRouter = require('./routes/vis');
var app = express();


//login
var clienttoserver = require('./routes/clienttoserver.js')
var port = process.env.PORT || 8080;
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//chat

var http = require('http').Server(app);
var io = require('socket.io')(http);


//getter
//ordbog

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//hbs.registerPartials(__dirname + '/views/partials');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/ordbog', ordbogRouter);
app.use('/tilfojord', tilfojordRouter);
//app.use('/vis', visRouter);
// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





//login
//Routes til scripts
var opretRouter = require('./models/brugerModel');
var regRouter = require('./routes/opretBruger');
//var loginRouter = require('./Clientside/logintoServer');

app.get('/login', function(req,res){
  res.sendFile(__dirname + '/Clientside/login.html')
})
//Henter fra roden af URL og til indholdet af opretBruger.html
app.get('/opretBruger', function(req, res){
  res.sendFile(path.join(__dirname + '/views/opretBruger.html'));
});

app.use('/css/style.css', function(req, res){
  res.sendFile(__dirname + '/public/stylesheets/style.css');
});

app.get('/kursistside',function(req, res){
  res.sendFile(__dirname + '/views/kursist/kursistside.html');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Fortæller hvilket route skal hentes indhold fra, og hente scripts fra
app.use('/opretBruger', regRouter);
//app.use('/login', loginRouter);



//chat
app.get('/chatover', function(req, res){
  res.sendFile(path.join(__dirname + '/Clientside/chatOverview.html'));
  //res.sendFile(__dirname + '/tsmtest.js');
});
app.get('/chatside', function(req,res){
  res.sendFile(__dirname + '/Clientside/chatSide.html');

  
})
//hvordan vi sender js filer,  den nedenunder skal i html 
//  <script src= "http://localhost:3000/tsmtest"></script>

app.get('/tsmtest', function(req, res){
  res.sendFile(__dirname + '/tsmtest.js')

})

//fixer Cro$s-Origin Resource Sharing (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//get alle brugerens chats
app.get('/getChats',function(req,res){
  //Her skal vi have lavet noget, så den sender en list over id'er på hvem man chatter med.
  //Det er en json, der skal hentes fra DB
  var sendListe = {arr :[{"id":"ajjskkksk123ws","name":"Hans"}, {"id":"ajjskodaoksdko2","name":"Johan"},{"id":"woolololololol","name":"Frank"},{"id":"ajjsk2daoksdko2","name":"Ulla"}]};
  res.send(sendListe);

});

//HUSK AT VI SKAL ÆNDRE DENNE
var chatDummy = {arr: [ { "besked": '16:05 11/12/2018 - Frank : Hej Johan' },
{ "besked": '16:07 11/12/2018 - Frank : Hej' },
{ "besked": '16:08 11/12/2018 - Frank : virker' },
{ "besked": '16:09 11/12/2018 - Frank : dette' },
{ "besked": '16:10 11/12/2018 - Frank : mon' },
{ "besked": '16:11 11/12/2018 - Frank : jo' },
{ "besked": '16:12 11/12/2018 - Frank : det tror jeg' },
{ "besked": '16:13 11/12/2018 - Frank : eller' } ]};

app.get('/getChat', function(request, res){
  res.send(chatDummy);
})





http.listen(8080, function(){
  console.log('listening on *:8080');
});

io.on('connection', function(socket){
    socket.on('new_client',function(username){
    socket.broadcast.emit('new_client', username);
    socket.broadcast.emit('new_client', socket.id);
    socket.username = username;
    socket.id = username;
    console.log(socket.id)
  console.log(username +' connected');
 
  
});

//
socket.on('disconnect',function(username){
  console.log( socket.username+' disconnected');
});



//En listener der venter på at 'chat message' eventet forekommer
  socket.on('chat message', function(msg){

    //Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb";

//Database navn: sprogAppChatDb
var dbNavn = "sprogappmongodb";
//Collection navn
var collectionNavn = "chatBeskeder"; //Skriv navnet på den collection der skal indsættes data i

    //Connecting til databasen
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
        if(err) throw err;
        //Database navnet den skal connecte til
        var dbo = db.db(dbNavn);



        
        
        //Jsonfilen der skal insættes i databasen
        var jsonEnkelt = {brugernavn:socket.username, besked:msg};

        //Vælger hvilken collection der skal indsættes data i og insætter data. 
        dbo.collection(collectionNavn).insertOne(jsonEnkelt, function(err, db){
            if(err) throw err;
            console.log("Besked: " + msg + " tilføjet til databasen");
            });
        });
        io.emit('chat message', msg)
    
        console.log(socket.username +' skriver til ' + msg);  
    });
    



}); 



//posters
//login
app.route('/Clientside/login').post(clienttoserver.login_as_client);


//listener
module.exports = app;


