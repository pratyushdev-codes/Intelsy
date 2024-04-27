const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require ('./src/Action');

const server = http.createServer(app);
const io = new Server(server);
const userSocketMap={};
function getAllConnectedClients(roomId){
    //Map
    return  Array.from(io.socket.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return{
            socketId,
            username:userSocketMap[socketId],

        }
    });

}



io.on('connection', (socket) => {
    console.log('socket connected', socket.id);


    socket.on(ACTIONS.JOIN , ({roomId, username})=>{
        userSocketMap[socket.id]= username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);


    })
});

const PORT = process.env.PORT || 3005;

server.listen(PORT, () => console.log(`Listening on Port ${PORT}`));