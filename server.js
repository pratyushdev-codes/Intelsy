const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Action'); // Assuming this path is correct
const { default: toast } = require('react-hot-toast');
const server = http.createServer(app);
const io = new Server(server);
const userSocketMap = {};

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId],
        };
    });
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach((client) => {
            if (client.username !== username) {
                io.to(client.socketId).emit(ACTIONS.JOINED, {
                    clients,
                    username,
                    socketId: socket.id,
                });
                toast.success(`${username} joined the playground`);
            }
        });
    });

    socket.on(ACTIONS.CODE_ONCHANGE, ({roomId, code})=>{
        io.to(roomId).emit(ACTIONS.CODE_CHANGE, {code});

    });

    socket.on('disconnect', () => { // Corrected 'diconnecting' to 'disconnect'
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => { // Corrected syntax for forEach
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, { // Corrected syntax for emit
                socketId: socket.id,
                username: userSocketMap[socket.id] // Corrected semicolon to comma
            });
        });
        delete userSocketMap[socket.id]; // Corrected syntax for deleting property
        socket.leaveAll(); // Corrected syntax for leaving all rooms
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
