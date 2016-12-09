var Conversation = require('../db/models/conversation.js');
var User = require('../db/models/users.js');
var Message = require('../db/models/message.js');
exports.getConversations(req, res, next) {
  Conversation.find({participants: req.user._id})
    .select('_id')
    .exec(conversations => {
      var fullConversations = [];
      conversations.forEach(conversation => {
        Message.find({'conversationId': conversation._id})
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'author',
            select: 'profile.firstName'
          })
          .exec(message => {
            fullConversations.push(message);
            if (fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations});
            }
          })
          .catch(err => {
            console.log('did save messages', err);
            return next(err);
          })
      })
      .catch(err => {
        console.log('did not find Conversation', err);
        return next(err)
      })
    })
}
