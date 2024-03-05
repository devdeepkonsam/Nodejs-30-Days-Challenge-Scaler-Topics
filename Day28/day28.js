const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });
    wss.on('connection', function connection(ws) {
        console.log('A new client connected.');

        ws.on('message', function incoming(message) {
            console.log('Received message:', message);
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

setupWebSocketServer(server);
app.get('/',(req,res)=>{
    res.send("Websocket is running")
})

server.listen(3000, () => {
    console.log(`http://localhost:3000`);
});
