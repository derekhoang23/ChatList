var socketEvents = function(io) {
  this.users = [];
  io.on('connection', socket => {
    console.log('a user  connected');
    // socket.on('enter conversation', conversation => {
    //   socket.join(conversation);
    //   console.log('joined ' + conversation);
    // });

    socket.on('currentUser', currentUser => {
      this.currentUser.push({
        id: socket.id,
        userName: currentUser
      });
      io.emit('currentInfo', this.currentUser, this.currentUser[0].id)
    });

    socket.on('username', userName => {
      this.users.push({
        id: socket.id,
        userName: userName
      });
      console.log('users', this.users);
      let len = this.users.length;
      len--;
      io.emit('userList', this.users, this.users[len].id);
    })

    socket.on('getMsg', data => {
      console.log('what data is in this', data)
      console.log('is this message sending through', data.msg)
      socket.broadcast.to(data.toid).emit('sendMsg', {
        msg: data.msg,
        name: data.name
      })
    })

    socket.on('disconnect', () => {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === socket.id) {
          this.users.splice(i, 1);
        }
      }

      io.emit('exit', this.users);
    })
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
