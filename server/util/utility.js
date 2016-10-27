
var app = require('../server.js');
var isLoggedIn = function(req) {
  return req.session ? !!req.session.token : false;
};

var checkUser = function(req, res, next) {
  if (!isLoggedIn(req)) {
    console.log('user is not logged in');
    res.redirect('/redirect');
  } else {
    console.log('user successfuly signed in');
    next();
  }
};

var createSession = function(req, res, newToken) {
    req.session.token = newToken;
    return req.session.save(err => {
      if (err) {
        console.log('did not save sess', err);
      } else {
        res.redirect('/');
      }
    });

};

module.exports = {
  checkUser,
  createSession
};
