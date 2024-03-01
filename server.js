const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use express-session middleware
const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
});

app.use(sessionMiddleware);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Set user's name in the session when they connect
    socket.on('setUsername', (username) => {
        socket.request.session.username = username;
        socket.request.session.save();
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        // Get user's name from the session
        const username = socket.request.session.username || 'Anonymous';
        io.emit('chat message', `${username}: ${msg}`);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
