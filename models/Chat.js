const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Chat = new Schema({
  members: { type: [Schema.Types.ObjectId], ref: 'users' },
},{
  timestamps: true,
}
);

module.exports = mongoose.model('chats', Chat)