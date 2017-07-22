var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// conectando o websocket
const server = app.use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log('Listening on ${ PORT }'));
const wss = new SocketServer({ server });

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

// ESCUTA AS CONEXÕES
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


