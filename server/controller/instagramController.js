var User = require('../db/models/users.js');
var util = require('../util/utility.js');
var request = require('request-promise');
var _ = require('lodash');
var getPics = function(req, res) {
  console.log('token', req.session.token);
  request(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${req.session.token}`)
  .then(result => {
    var urls = [];
    var data = {};
    var feed = JSON.parse(result);
    _.map(feed.data, image => {
      urls.push(image.images.thumbnail.url);
    });

    res.send({urls: urls});
  })
  .catch(err => {
    console.log('did not get feedback from ig', err);
  });
};

var retrieveUsers = function(req, res) {
  User.find({instagramName: {
    $ne: req.session.username
  }})
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

module.exports = {
  retrieveUsers,
  getPics
};
