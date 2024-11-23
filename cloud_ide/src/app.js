const express=require('express');
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const cors=require('cors');

const app=express();
const server=http.createServer(app);
const io=new SocketServer({
    cors:'*'
});

io.attach(server);
app.use(cors());
app.use(express.json());

const fileRouter=require('./routes/filesRouter');

app.use('/',fileRouter);

module.exports={app,server,io}