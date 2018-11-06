var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chatSide.html');
});


//fixer Cross-Origin Resource Sharing (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//get alle brugerens chats
app.get('/getChats',function(req,res){
  //Her skal vi have lavet noget, så den sender en list over id'er på hvem man chatter med.
  //Aka noget ala. [{ajjskkksk123ws, sjiij222jk3jd, jijidkerjkk23123}] 
  var sendListe = [{"id":"ajjskkksk123ws","name":"Hans"}, {"id":"ajjskodaoksdko2","name":"Johan"}];
  res.sendFile(sendListe);

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
    socket.on('new_client',function(username){
    socket.broadcast.emit('new_client', socket.username);
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
  io.emit('chat message', msg);
  console.log(socket.username +' siger: ' + msg);  
});

});