const express = require('express');
var app = express();
var server = require('http').createServer(app);
const socketIO = require('socket.io');
const path = require('path');
var chat = require('./controllers/chat');
var mongoose = require('mongoose');

const port  = process.env.PORT || 3000;

var mOptions = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://iot_chat:iot_chat@ds151820.mlab.com:51820/iot_chat';

mongoose.connect(mongodbUri, mOptions);

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
    console.log('Conectado ao MongoDB');
});

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

const io = socketIO(server);

io.of('/chat').on('connection', chat);
