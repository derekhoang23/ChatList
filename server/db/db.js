var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
mongoose.connect('mongodb://heroku_3qxgk6tg:2tprip1svr112af3t3i39dmlme@ds063406.mlab.com:63406/heroku_3qxgk6tg', function(err) {
  if (err) {
    console.log('err');
  } else {
    console.log('connect to mongo');
  }
});

module.exports = mongoose;
