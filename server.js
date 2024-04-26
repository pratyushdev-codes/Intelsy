const { Socket } = require('dgram');
const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const {Server} =  require (Socket.io);

const io = new Server(server);


io.on('connection',(socket)=>{
    console.log('socket connected', socket.id);
});



const PORT= process.env.port || 5000;

server.listen(PORT, ()=> console.log("Listening on Port ${PORT}"));




