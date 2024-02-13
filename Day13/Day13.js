const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket server setup
function setupWebSocket(server) {
  wss.on('connection', function connection(ws) {
    console.log('Client connected');
    
    // Handle messages from clients
    ws.on('message', function incoming(message) {
      console.log('Received:', message);
      
      // Echo the received message back to the client
      ws.send(message);
    });
    
    // Handle disconnection
    ws.on('close', function close() {
      console.log('Client disconnected');
    });
  });
}

// Set up WebSocket server
setupWebSocket(server);

// Route for serving the HTML page with WebSocket connection
app.get('/websocket', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
