const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Skill} = require('./Skill')
const {Post} = require('./Post')

const Avatar = new Schema({
    avatarUrl: { type: String },
    cloudinary_id: { type: String },
});

const Photo = new Schema(
    {
        photoUrl: { type: String },
        cloudinary_id: { type: String },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
    },
    {
        timestamps: true,
    },
);

const User = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        displayName: { type: String, required: true },
        avatar: {
            type: Avatar,
            default: {
                avatarUrl: 'https://avatars.dicebear.com/api/adventurer-neutral/your-custom-seed.svg',
                cloudinary_id: '',
            },
        },
        bio: { type: String, default: 'Hôm nay vừa mưa lại vừa lạnh, không bằng ở nhà chơi game với mình nha ^_____^' },
        age: { type: Number, default: 18 },
        photos: { type: [Photo] },
        coin: {type: Number, default : 8888},
        gender: {type: String},
        skills: {type: [Skill]},
        following: {type: [Schema.Types.ObjectId],
            ref: 'users',  default : []},
        follower: {type:[Schema.Types.ObjectId],
            ref: 'users',  default : []},
        posts: {type: [Post],  default : []},
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('users', User);
