const express = require('express');
var app = express();
var server = require('http').createServer(app);
const socketIO = require('socket.io');
const path = require('path');
var auditoria = require('./controllers/auditoria');

const port  = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

const io = socketIO(server);

io.of('/chat').on('connection', auditoria);
