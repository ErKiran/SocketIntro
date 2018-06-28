 var socket = io();

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('CreateEmail',{
        to:'REactde@gmail.com',
        text:'Hello REact'

      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    socket.on('newEmail',(email)=>{
      console.log('Email has arrived',email);
    });