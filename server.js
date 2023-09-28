const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket Server Running');
});

// Create a WebSocket server by passing the HTTP server instance
const wss = new WebSocket.Server({ server });

// Store the connected clients
const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('A new client connected.');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Broadcast the message to all connected clients (except the sender)
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log(`Sending message to client: ${message}`);
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('A client disconnected.');
    });
});

// Start the server on a port (e.g., 3000)
server.listen(3000, () => {
    console.log('WebSocket server is running on http://localhost:3000');
});
