var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var router = require('./routes.js');
require('dotenv').config();
var api = require('instagram-node').instagram();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  // access control allow origin has to be chrome:extension/chromeID
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
  if (req.method.toLowerCase() !== 'options') { return next(); }
  return res.sendStatus(204);
});


app.use('/', router);
app.listen(3000, function() {
  console.log('Listening to port 3000!');
});
