var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.path('/myownpath');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
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

    socket.on('disconnect',function(username){
        console.log( socket.username+' disconnected');
    });
    // En listener der venter på at 'chat message' eventet forekommer
    socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(socket.username +' siger: ' + msg);
    
});
});
io.on('connection', function(socket){
   
   });




