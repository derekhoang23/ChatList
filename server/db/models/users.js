var mongoose = require('../db.js');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  instagramId: String,
  accesstoken: String,
  instagramName: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
