const mongoose = require("mongoose")
const Schema = mongoose.Schema;

 const Skill = new Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true},
  gender: { type: String, required: true},
  nickname: { type: String, required: true},
  avatarUrl: { type: String, required: true},
  iconUrl: { type: String, required: true},
  price: {type: Number, required: true},
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  games: {
    type: Schema.Types.ObjectId,
    ref: 'games',
  },
  isActive: {type: Boolean},
  isBusy: {type: Boolean},
  audioUrl: { type: String},
  intro: { type: String},
  reviews: {type: [String]},
  order: {type: Number},
  rating: {type: Number},
},{
  timestamps: true,
}
);

 

module.exports = mongoose.model('skills', Skill), {Skill}