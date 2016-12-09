var mongoose = require('../db.js');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
