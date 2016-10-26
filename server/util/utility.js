var isLoggedIn = function(req) {
  return req.session ? !!req.session.token : false;
};

var checkUser = function(req, res, next) {
  if (!isLoggedIn(req)) {
    res.redirect('/redirect');
  } else {
    next();
  }
};

var createSession = function(req, res, newToken) {
  return req.session.regenerate(() => {
    req.session.token = newToken;
    res.redirect('/');
  });
};

module.exports = {
  checkUser,
  createSession
};
