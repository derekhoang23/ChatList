var redirect_uri = 'http://localhost:3000/handleauth';
var instalink = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.Instagram_ClientId}&redirect_uri=${redirect_uri}&response_type=code`


var verifyUser = function(req, res) {
  var code = req.query.code;
  var url = 'https://api.instagram.com/oauth/access_token';
  var options = {
    url: url,
    method: 'GET',
    body: {
      client_id: process.env.Instagram_ClientId,
      client_secret: process.env.Instagram_ClientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirect_uri,
      code: code
    },
    json: true
  }
  request(options, function(err, res, body) {
    console.log('body', body);
  });
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
};

var auth = function(req, res) {
  console.log('Visted Index');
  res.redirect(instalink);
};

module.exports = {
  auth,
  verifyUser
}
