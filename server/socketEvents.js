var socketEvents = function(io) {
  io.on('connection', socket => {
    console.log('a user  connected');

    socket.on('enter conversation', conversation => {
      socket.join(conversation);
      console.log('joined ' + conversation);
    });

    socket.on('leave conversation', conversation => {
      socket.leave(conversation);
      console.log('left ' + conversation);
    });

    socket.on('new message', function(data) {
      console.log('hfuefhrf', data)
      io.sockets.in(data.id).emit('refresh', data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

  });
};

module.exports = socketEvents;
