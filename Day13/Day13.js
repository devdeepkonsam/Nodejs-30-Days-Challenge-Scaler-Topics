const WebSocket = require('ws');
const express = require('express');
const http = require('http');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message) {
      console.log('Received: %s', message);
      // Echo back the received message
      ws.send(message);
    });

    ws.on('close', function() {
      console.log('Client disconnected');
    });
  });
}

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.get('/websocket', function(req, res) {
  res.sendFile(__dirname + '/websocket.html');
});

server.listen(3000, function() {
  console.log('Server started on port 3000');
});
