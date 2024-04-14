const express = require('express');
const socket = require("socket.io")
const app = express();
const cors = require('cors');
const PORT = 3000;
app.use(cors());


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// static files
app.use(express.static('public'));

// Socket
const io = socket(server);

io.on('connect', function(socket){
    console.log("connection made on socket", socket.id)

    // socket.on('chat', function(data){
    //    io.sockets.emit('chat',data);
    // })

    socket.on("join-room",(room)=>{
        socket.join(room.roomId)
        console.log(`User joined room: ${room.roomId}`);
    })

    socket.on("chat", (data) =>{
        console.log(data)
        io.to(data.room).emit('chat',data);
    })
})

