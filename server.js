const express = require('express');
var bodyParser = require("body-parser");
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

var app = express();
app.use(bodyParser.json());

var server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

app.get("/", function(req, res) {
  console.log('Caaaanected');
  res.sendFile( __dirname + "/" + "index.html" );
});

app.get("/rec/:item", function(req, res) {
  console.log('Caaaanected');
  res.status(200);
  //res.send('ab?cd')
  res.send(req.params)
  console.log(req.params)
  io.emit('time', req.params.item, 1000);
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

