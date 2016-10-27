require('dotenv').config();
var path = require('path');
var User = require('../db/models/users.js');
var request = require('request-promise');
var util = require('../util/utility.js');
var Url = require('url');
var redirect_uri = 'http://localhost:3000/handleauth';
var instalink = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.Instagram_ClientId}&redirect_uri=${redirect_uri}&response_type=code`;

var logout = function(req, res) {
  req.session.destroy(function() {
    console.log(instalink);
    res.status(201).send({url: instalink});
  })
};


var authUser = function(req, res) {
  console.log('redirecting to auth ig');
  console.log('ueirfhrufhr')
    res.redirect(instalink);
};

var handleauth = function(req, res) {
  var code = req.query.code;

  var url = "https://api.instagram.com/oauth/access_token";
  var options = {
    url: url,
    method: 'POST',
    form: {
      client_id: process.env.Instagram_ClientId,
      client_secret: process.env.Instagram_ClientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirect_uri,
      code: code
    },
    json: true
  };

  request(options)
    .then(body => {
      User.findOne({instagramName: body.user.username})
        .then(user => {
          if (!user) {
            console.log('new user', body);
            return new User({ instagramName: body.user.username, accesstoken: body.access_token, instagramId: body.user.id})
            .saveAsync()
              .spread(user => {
                console.log('saved user to db', user)
                util.createSession(req, res, user.accesstoken)
                // res.sendFile(path.join(__dirname, '../../client/index.html'));
              })
              .catch(() => {
                console.log('did not save user to db');
              })
          } else {
            console.log('user already in db');
            util.createSession(req, res, user.accesstoken);
            // res.sendFile(path.join(__dirname, '../../client/index.html'));
          }
        })
        .catch(err => {
          ('did not find user', err);
        });
    })
    .catch(err => {
      console.log('request failed');
    });
};

var directHome = function(req, res) {
    console.log('req', req.session);
    res.sendFile(path.join(__dirname, '../../client/index.html'));
};

module.exports = {
  authUser,
  handleauth,
  directHome,
  logout
};
