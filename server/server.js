var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var router = require('./routes.js');
require('dotenv').config();
var api = require('instagram-node').instagram();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
var redirect_uri = 'http://localhost:3000/handleauth';
var instalink = 'https://api.instagram.com/oauth/authorize/?client_id=d35a51e3526244daba1e5d363b34ad00&redirect_uri=http://localhost:3000/handleauth&response_type=code';
app.all('/*', function(req, res, next) {
  // access control allow origin has to be chrome:extension/chromeID
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
  if (req.method.toLowerCase() !== 'options') { return next(); }
  return res.sendStatus(204);
});
app.get('/', function (req, res) {
    res.redirect(instalink)
})

app.get('/mycallback', function (req, res) {
    //handle token retrieval here
    //do a get request as per the instagram documentation using the code sent back
    var code = req.query.code


    var url = 'https://api.instagram.com/oauth/access_token'
    var options = {
        method: 'post',
        body: {
            client_secret: process.env.Instagram_ClientId,
            grant_type: 'authorization_code',
            redirect_uri: redirect_uri,
            code: code
        },
        json: true,
        url: url
    }
    request(options, function (err, res, body) {
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
        if(err) {
          console.log('error')
        } else {
          console.log('body', body);
        }
    })
})

// app.use('/', router);
app.listen(3000, function() {
  console.log('Listening to port 3000!');
});
