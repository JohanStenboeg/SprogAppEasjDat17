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

io.on('connection', function(socket,username){
    socket.on('new_client',function(username){
    socket.broadcast.emit('new_client', socket.username);
    socket.username = username;
  console.log(username +' connected');
  
});
    socket.on('disconnect',function(username){
        console.log( socket.username+' disconnected');
    });
});
io.on('connection', function(socket){
   socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(socket.username +' siger: ' + msg);
    
    let besked = msg;
if (besked === "join 2"){
socket.join("RoomName");
}
   });
});




