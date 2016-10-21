var rp = require('request-promise');
require('dotenv').config();
var path = require('path');
var User = require('../db/models/users.js');
var request = require('request-promise');
// var Promise = require('bluebird');
// Promise.promisfy(User);
var redirect_uri = 'http://localhost:3000/handleauth';
var instalink = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.Instagram_ClientId}&redirect_uri=${redirect_uri}&response_type=code`;
var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;

};

// var checkUser = function(req, res, next) {
//   if (!!isLoggedIn(req)) {
//     res.redirect(instalink);
//   } else {
//     next();
//   }
// };

var authUser = function(req, res) {
  if (req.session.token === undefined) {
    res.redirect(instalink);
  } else {
    console.log('here')
    res.sendFile(path.join(__dirname + '../../client/dist/index.html'));
  }
  // res.redirect(api.get_authorization_url(redirect_uri, {scope: ['likes'], state: 'a state'}));
};

var handleauth = function(req, res) {
  // api.authorize_user(req.query.code, redirect_uri, function(err, result) {
  //   if (err) {
  //     console.log(err.body);
  //     res.send('didnt work');
  //   } else {
  //     console.log('it work');
  //     res.send('youre in');
  //   }
  // });
  var code = req.query.code;
  var url = "https://api.instagram.com/oauth/access_token";
  var options = {
    url: url,
    method: "POST",
    form: {
      client_id : process.env.Instagram_ClientId,
      client_secret : process.env.Instagram_ClientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirect_uri,
      code: code
    },
    json: true
  };

  request(options, function(err, res, body) {
    var user = new User({ instagramName: body.user.username, accesstoken: body.access_token, instagramId: body.user.id})
    user.saveAsync()
    .then(user => {
      if (err) {
        console.log('error in saving', err);
      } else {
        console.log('saved to db');
        return user;
      }
    })
    .catch(err => {
      console.log('err', err);
    })
  })
  .then(user => {
    req.session.token = user.access_token;
    res.redirect('/');
  })
  .catch(err => {
    console.log('error', err);
  })
};

module.exports = {
  authUser,
  handleauth
};
