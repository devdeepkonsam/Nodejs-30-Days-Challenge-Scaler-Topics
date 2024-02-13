const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const port = process.env.PORT || 3000;

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
 
  server.listen(port , () => {
    console.log(`http://localhost:${port}`);
  });
}

startServer();
