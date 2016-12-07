var mongoose = require('../db.js');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  instagramId: String,
  accesstoken: String,
  instagramName: String,
  name: String
  // Check if mongoose database can store multiple friend entries
});

var MessageShema = new Schema({
  ReceiverName: String,
  SenderName: String,
  messages: []
});

var User = mongoose.model('User', userSchema);
module.exports = User;
