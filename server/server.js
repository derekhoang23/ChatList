var express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var router = require('./routes.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var auth = require('./controller/authController.js');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var app = express();
require('dotenv').config();
const connection = mongoose.createConnection(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  store: new MongoStore({mongooseConnection: connection}),
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 60000
  }
}));



app.all('/*', function(req, res, next) {
  // access control allow origin has to be chrome:extension/chromeID
  res.header('Access-Control-Allow-Credentials', true);
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

module.exports = app;
