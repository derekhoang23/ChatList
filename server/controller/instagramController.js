var User = require('../db/models/users.js');
var util = require('../util/utility.js');

var retrieveUsers = function(req, res) {
  console.log('sess', req.session);
  User.find({})
  .then(users => {
    var usersmap = {};
    users.forEach(user => {
      usersmap['name'] = user.instagramName;
    });
    res.send(usersmap);
  })
  .catch(err => {
    console.log('no users found', err);
  });
};

module.exports = retrieveUsers;
