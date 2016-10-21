var rp = require('request-promise');
require('dotenv').config();
var path = require('path');
// var passport = require('passport');

var redirect_uri = 'http://localhost:3000/handleauth';
var instalink = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.Instagram_ClientId}&redirect_uri=${redirect_uri}&response_type=code`;

var verifyUser = function(req, res) {
      //handle token retrieval here
      //do a get request as per the instagram documentation using the code sent back
  var code = req.query.code;
  console.log('code', code);
  var url = 'https://api.instagram.com/oauth/access_token';
  var options = {
    method: 'POST',
    form: {
      client_id: process.env.Instagram_ClientId,
      client_secret: process.env.Instagram_ClientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirect_uri,
      code: code
    },
    url: url
  };

  rp(options)
    .then((body) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
      // res.send({token: body.access_token})
      // console.log('body', body);
    })
    // .then(() => {
    // })
    .catch(err => {
      console.log('error', err);
      // res.sendFile(path.join(__dirname, '../../client/dist/index.html'));

    });
          //body should look something like this
          // {
          //     "access_token": "fb2e77d.47a0479900504cb3ab4a1f626d174d2d",
          //     "user": {
          //         "id": "1574083",
          //         "username": "snoopdogg",
          //         "full_name": "Snoop Dogg",
          //         "profile_picture": "..."
          //     }
          // }


};

var auth = function(req, res) {
  console.log('Visted Index');
  res.redirect(instalink);
};
module.exports = {
  auth,
  verifyUser
};
