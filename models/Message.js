const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Message = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'chats' },
  senderId: { type: Schema.Types.ObjectId, ref: 'users' },
  text: {type: String}
},{
  timestamps: true,
}
);

module.exports = mongoose.model('messages', Message)