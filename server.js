var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', process.env.PORT || 3000);

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(app.get('port'), function() {
    console.log('Server is listening on 3000');
});