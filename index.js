const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 5000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage',{
    from:"Kiran",
    Text:"How the socket Working"
  });

  socket.on('CreateMessage',(newMessage)=>{
    console.log('Create Message',newMessage)
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
