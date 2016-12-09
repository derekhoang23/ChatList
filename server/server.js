var express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var app = express();
var socketEvents = require('./socketEvents.js');
var server = app.listen(3000);
var io = require('socket.io')(server);
var router = require('./routes.js');
require('dotenv').config();
const connection = mongoose.createConnection(process.env.MONGODB_URI);
socketEvents(io);

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

// app.io = io.sockets.on('connection', function(socket) {
//   socket.on('server', function(data) {
//     console.log('data', data);
//   });
// });

// app.use(function(req, res, next) {
//   req.io = io;
//   next();
// });



app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
  if (req.method.toLowerCase() !== 'options') { return next(); }
  return res.sendStatus(204);
});





app.use('/', router);





// module.exports = passSocket;
