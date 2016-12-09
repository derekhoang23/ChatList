var mongoose = require('../db.js');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var Message = mongoose.model('MessageShcema', me)

module.exports = Message;
