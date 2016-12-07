var express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var router = require('./routes.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var app = express();
var io = require('socket.io').listen(app.listen(3000));
require('dotenv').config();
const connection = mongoose.createConnection(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));
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
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
  if (req.method.toLowerCase() !== 'options') { return next(); }
  return res.sendStatus(204);
});



io.sockets.on('connection', function(socket) {
  console.log('client connected');
  socket.on('sender', function(data) {
    console.log('data', data)
    io.emit('received', data)
  });

});

// app.use(function(req, res, next) {
//   req.io = io;
//   next();
// });

app.use('/', router);



// app.listen(3000, function() {
//   console.log('Listening to port 3000!');
// });



module.exports = app;
