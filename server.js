var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var userName = "";
io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('new user', function(name) {
        userName = name;
        console.log(name + ' just joined');
        socket.broadcast.emit('new user', name);
    });
    socket.on('chat message', function(msg) {
        msg = userName + ': ' + msg;
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