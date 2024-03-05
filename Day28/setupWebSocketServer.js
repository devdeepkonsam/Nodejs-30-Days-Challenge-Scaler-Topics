const WebSocket = require('ws');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws) {
        console.log('A new client connected.');

        ws.on('message', function incoming(message) {
            console.log('Received message:', message);

            // Broadcast the message to all connected clients
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', function close() {
            console.log('Client disconnected.');
        });
    });
}

module.exports = setupWebSocketServer;
