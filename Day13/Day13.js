const WebSocket = require('ws');
const express = require('express');
const http = require('http');


/**
 * WebSocket server for Express
 * @param {Object} server - HTTP server instance
 */
function setupWebSocket(server) {
  // Your implementation here
  const wss = new WebSocket.Server({ server });
  wss.on('connection', function connection(ws) {
    console.log('Client connected');
    ws.on('message', function incoming(message) {
      console.log('Received message:', message.toString());
      ws.send(message); 
    });
  });
}

function startServer() {
  const app = express();
  const server = http.createServer(app);

  setupWebSocket(server);

  app.get('/websocket', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  server.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

startServer();
