var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true},
  access_token: { type: String, require: true},
  created_at: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
