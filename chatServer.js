var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.path('/myownpath');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Hvilken port, serveren lytter til (den port du skal indtaste, efter hostnavn)
http.listen(3000, function(){
  console.log('listening on *:3000');
});

/* Definerer al tekst, der vedrører usernames, når en bruger er connected,
således at det, som brugeren indtaster i tekstfielded bliver sat til username.
*/
io.on('connection', function(socket){
    socket.on('new_client',function(username){
    socket.broadcast.emit('new_client', socket.username);
    socket.username = username;
    socket.id = username;
    console.log(socket.id)
  console.log(username +' connected');
  
  
}); 
    // En listener der venter på at 'disconnect' eventet forekommer. 
    socket.on('disconnect',function(username){
        console.log( socket.username+' disconnected');
    });
    // En listener der venter på at 'chat message' eventet forekommer.
    socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
    
});
});





