var redirect_uri = 'http://localhost:3000';

var igAuthorization = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

var handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('sucess!');
      res.send('successfully logged in!');
    }
  });
};

module.exports = {
  igAuthorization,
  handleauth
};
