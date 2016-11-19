var User = require('../db/models/users.js');
var request = require('request-promise');
var util = require('../util/utility.js');

var searchFriend = function(req, res) {
  var body = req.body;
  console.log('search friend', body);
  // find User based on instagram name or actually name
  // respond back with name
};



module.exports = searchFriend;
