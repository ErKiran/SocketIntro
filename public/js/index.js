var socket = io();

socket.on('connect',  ()=> {
  console.log('Connected to server');
});

socket.on('disconnect',  ()=> {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
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