const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket event listener
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast the received message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Start the server on a port (e.g., 3000)
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});