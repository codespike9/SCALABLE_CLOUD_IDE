const {server,io}=require('./app');
const mainSocket = require('./sockets/mainSocket');
const PORT=9000;


io.on('connection',(socket)=>{
    mainSocket(socket);
})
server.on("error",(err)=>{
    console.error("Express app initialization error: ",err);
})
server.listen(PORT, ()=>{
    console.log(`Docker server running on port ${PORT}`);
})  