const { Socket } = require('dgram');
const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const {Server} =  require (Socket.io);

const io = new Server(server);

const PORT= process.env.port || 5000;

server.listen(PORT);

