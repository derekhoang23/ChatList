var io = require('../server.js');

var saveMessages = function(req, res) {
  console.log('io', req.io)
};



module.exports = saveMessages;
