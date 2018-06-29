var socket = io();

socket.on('connect',  ()=> {
  console.log('Connected to server');
});

socket.on('disconnect',  ()=> {
  console.log('Disconnected from server');
});

socket.on('newMessage',  (message) => {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',  (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  },  ()=> {

  });
});
var locationbtn = jQuery('#Geo-Location');
locationbtn.on('click',()=>{
  if(!navigator.geolocation)
  {
    return alert('Geo-Location is not supported by the browser');
  }
  navigator.geolocation.getCurrentPosition((position)=>{
    socket.emit('createLocation',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },()=>{
  alert('Unable to fetch location');
  });
});