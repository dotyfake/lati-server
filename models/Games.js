const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Games = new Schema({
  name: {type: String, required: true},
  title: {type: String},
  slug: {type: String},
  pcImageUrl: {type: String},
  iconUrl: {type: String},
  mainIconUrl: {type: String},
  imageUrl: {type: String},
  brickMini: {type: String},
  brickIcon: {type: String},
  bannerUrl: {type: String},
},{
  timestamps: true,
}
);

module.exports = mongoose.model('games', Games)