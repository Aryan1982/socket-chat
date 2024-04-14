// Make connection

const socket = io.connect("https://socket-chat-gj7t.onrender.com");

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    joinRoomBtn = document.getElementById("join"),
    roomId = document.getElementById('room')
// Emit events
btn.addEventListener('click', function(event){
    event.preventDefault();

    socket.emit('chat', {
        message: message.value,
        room: roomId.value,
        handle: handle.value,
    });
    message.value = "";
});

joinRoomBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    socket.emit('join-room',{
        roomId: roomId.value
    })
    joinRoomBtn.innerHTML=  `joined ${roomId.value}`
})
// Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
