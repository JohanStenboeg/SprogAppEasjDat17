
//omega filen

//imports
// ordbog
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var ordbogRouter = require('./routes/ordbog');
var redigerordRouter = require('./routes/redigerord');
var testRouter = require('./routes/test');
var app = express();


//login
var clienttoserver = require('./routes/clienttoserver.js')
var port = process.env.PORT || 8080;
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//chat

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//login
//Routes til scripts
var opretRouter = require('./models/brugerModel');
//var regRouter = require('./routes/opretBruger');
//var loginRouter = require('./Clientside/logintoServer');

/**ROUTES TIL SCRIPTS */
var opretRouter = require('../Super/routes/opretBruger.js');
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
  res.sendFile(path.join(__dirname + '/views/kursist/kursistside.html'));
});
//henter indhold til SprogmakkerSide endpoint
app.get('/sprogmakkerside', function(req, res){
  res.sendFile(path.join(__dirname + '/views/sprogmakker/sprogmakkerside.html'));
});
//henter indhold til UnderviserSide endpoint
app.get('/underviserside', function(req, res){
  res.sendFile(path.join(__dirname + '/views/underviser/underviserside.html'));
});
//henter indhold til Kursist + ID endpoint
app.get('/Kursist' /* + et ID */, function(req, res){
  res.sendFile(path.join(__dirname + '/views/kursist/Kursist.html'));
});
//henter indhold til Sprogmakker + ID endpoint
app.get('/Sprogmakker' /* + et ID */, function(req, res){
  res.sendFile(path.join(__dirname + '/views/sprogmakker/Sprogmakker.html'));
});
//henter indhold til Underviser + ID endpoint
app.get('/Underviser' /* + et ID */, function(req, res){
  res.sendFile(path.join(__dirname + '/views/underviser/Underviser.html'));
});

/**STYLESHEET */
app.use('/stylesheets/stylelogin.css', function(req, res){
  res.sendFile(__dirname + '/public/stylesheets/stylelogin.css');
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

//CHATTENTEST
app.get('/chatOverview', function(req, res){
  res.sendFile(path.join(__dirname + '/Clientside/chatOverview.html'));
  
});

//CHATTEN


app.get('/chatOverview', function(req, res){
  res.sendFile(path.join(__dirname + '/Clientside/chatOverview.html'));
  
});
app.get('/chatside', function(req,res){
  res.sendFile(path.join(__dirname + '/Clientside/chatSide.html'));

  
})
app.get('/rewards', function(req,res){
  res.sendFile(path.join(__dirname + '/Clientside/rewards.html'));

  
})
app.get('/dagensopgaver', function(req,res){
  res.sendFile(path.join(__dirname + '/Clientside/dagensopgaver.html'));

  
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

//getter
//ordbog

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/test', indexRouter);
app.use('/ordbog', ordbogRouter);
app.use('/redigerord', redigerordRouter);
app.use('/test', testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
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









//posters
//login
/*
app.route('/').post('clienttoserver.login_as_client');
*/
http.listen(8080, function(){
  console.log('listening on *:8080');
});

//listener
//module.exports = app;


