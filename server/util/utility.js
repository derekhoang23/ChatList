
var app = require('../server.js');
var isLoggedIn = function(req) {
  return req.session ? !!req.session.token : false;
};

var checkUser = function(req, res, next) {
  if (!isLoggedIn(req)) {
    console.log('user is not logged in');
    res.redirect('/redirect');
  }
  else {
    next();
  }
  // if (req.session.token || req.path === '/redirect') {
  //   next();
  // } else {
  //   console.log('user is not logged in');
  //   res.redirect('/redirect');
  // }
};

var createSession = function(req, res, body) {
    req.session.token = body.accesstoken;
    req.session.username = body.instagramName ;
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
