var socket = io();

socket.on('connect',  ()=> {
  console.log('Connected to server');
});

socket.on('disconnect',  ()=> {
  console.log('Disconnected from server');
});

socket.on('newMessage',  (message) => {
  console.log('newMessage', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage',(message)=>{
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My Location </a>');
  li.text(`${message.from}: ${formattedTime}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

var messagetextbox = jQuery('[name=message]');
jQuery('#message-form').on('submit',  (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: messagetextbox.val()
  },  ()=> {
    messagetextbox.val('')
  });
});
var locationbtn = jQuery('#Geo-Location');
locationbtn.on('click',()=>{
  if(!navigator.geolocation)
  {
    return alert('Geo-Location is not supported by the browser');
  }
  locationbtn.attr('disabled','disabled').text('Sending location ....');
  navigator.geolocation.getCurrentPosition((position)=>{
    locationbtn.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },()=>{
  alert('Unable to fetch location');
  locationbtn.removeAttr('disabled').text('Send location');
  });
});