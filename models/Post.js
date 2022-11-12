const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        avatarUrl: { type: String },
        nickname: { type: String },
        content: { type: String },
        userId: { type: String },
    },
    {
        timestamps: true,
    },
);

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

const Post = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        content: { type: String },
        photo: { type: Photo },
        like: { type: [Schema.Types.ObjectId], ref: 'users' },
        comments: {
            type: [Comment],
        },
    },
    {
        timestamps: true,
    },
);

(module.exports = mongoose.model('posts', Post)), { Post };
