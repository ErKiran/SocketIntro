 var socket = io();

    socket.on('connect', () => {
      console.log('Connected to server');
      
      socket.emit('CreateMessage',{
        from:"Kiran",
        text:"how is socket Working"
      });

    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('newMessage',(message)=>{
      console.log('Message has arrived',message);
    });