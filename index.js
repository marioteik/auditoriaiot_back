const express = require('express');
var app = express();
var server = require('http').createServer(app);
const socketIO = require('socket.io');
const path = require('path');
var chat = require('./controllers/chat');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 3000;
const local = process.env.AMBIENT == 'local';

app.use(bodyParser.json());

var mOptions = {
    server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
};

if (local)
    db = mongoose.connect('mongodb://localhost/auditoriaiot2', mOptions);
else
    db = mongoose.connect('mongodb://auditoriaiot:Auditoria69*@mongodb.uhserver.com:27017/auditoriaiot', mOptions);

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function () {
    console.log('Conectado ao MongoDB');
});

var Auditorias = require('./models/auditorias');

// INICIA AS ROTAS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var auditoriaRoutes = require('./routes/auditoria')(Auditorias);
app.use('/auditoria', auditoriaRoutes);

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

const io = socketIO(server);

io.of('/chat').on('connection', chat);
