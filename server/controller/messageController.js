var io = require('../server.js');

var saveMessages = function(req, res) {
  // req.io.sockets.on(req.body.receiverName, function(data) {
  //   console.log('data=>>>', data);
  //   // req.io.sockets.emit(req.body.senderName, data);
  // });
  // io.sockets.on('connection', function(socket) {
  //   socket.on(req.body.receiverName, function(data) {
  //     console.log(';dta', data);
  //     io.sockets.emit(req.body.senderName(data))
  //   });
  // });
  // console.log('socket', req.io);
  // console.log('senderName', req.body.senderName)
  // console.log('receiver', req.body.receiverName);
  // console.log('socketefe', req.body)
  // io.sockets.on(req.body.receiverName, function(data) {
  //   console.log('=>>>', data);
  //   });
  // req.io.on('connection', function(socket) {
  //   console.log('here i am');
  //   console.log('is this valid', socket);
  // });

  // req.app.io.on(req.body.receiverName, function(data) {
  //   console.log('is this working');
  //   console.log('whats in here', data)
  // })

  console.log('hey')

};

// var saveMessages = function(app, io) {
//
// }



module.exports = saveMessages;
