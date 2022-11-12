const cloudinary = require('../utils/cloudinary');
const User = require('../models/User');

class AccountController {
    async uploadAvatar(req, res, next) {
        const { avatar } = req.body;
        const userId = req.userId;

        try {
            let user = await User.findById(userId);
            // Delete image from cloudinary
            if (user.avatar.cloudinary_id) {
                await cloudinary.uploader.destroy(user.avatar.cloudinary_id);
            }
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(avatar);
            const data = {
                avatar: {
                    cloudinary_id: result.public_id,
                    avatarUrl: result.url,
                },
            };
            user = await User.findByIdAndUpdate(userId, data, { new: true });
            res.json({ avatar: result.url });
        } catch (err) {
            console.log(err);
        }
    }

    async uploadPhoto(req, res, next) {
        const { photo } = req.body;
        const userId = req.userId;

        try {
            let user = await User.findById(userId);
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(photo);
            const data = {
                cloudinary_id: result.public_id,
                photoUrl: result.url,
                userId,
            };
            user = await User.findByIdAndUpdate(userId, { $push: { photos: data } }, { new: true, upsert: true });
            res.json({ photos: user.photos });
        } catch (err) {
            console.log(err);
        }
    }

    async updateUser(req, res, next) {
        const userId = req.userId;
        const value = parseInt(req.body.value);
        console.log(req.body.value, value);
        if (req.body.name === 'age' && !Number.isInteger(value))
            return res.status(500).json({ success: false, message: 'Age must be a number!' });

        const data = {
            [req.body.name]: req.body.value,
        };
        try {
            let user = await User.findById(userId);
            console.log(user);
            user = await User.findByIdAndUpdate(userId, data, { new: true });
            res.json({ [req.body.name]: req.body.value });
        } catch (err) {
            console.log(setError(err));
        }
    }

    async deletePhoto(req, res, next) {
        const { cloudinary_id, photoId } = req.body;
        const userId = req.userId;

        try {
            let user = await User.findById(userId);
            await cloudinary.uploader.destroy(cloudinary_id);
            user = await User.findByIdAndUpdate(
                userId,
                { $pull: { photos: { _id: photoId } } },
                { new: true, upsert: true },
            );
            res.json({ photos: user.photos });
        } catch (err) {
            console.log(err);
        }
    }

    async updateFollowingUser(req, res, next) {
        const { action, followingUserId } = req.query;
        const userId = req.userId;

        try {
            let queryFilter = action === 'unfollow' ? '$pull' : '$push';
            const userFollowing = await User.findByIdAndUpdate(
                userId,
                { [queryFilter]: { following: followingUserId } },
                { new: true, upsert: true },
            );
            const userFollower = await User.findByIdAndUpdate(
                followingUserId,
                { [queryFilter]: { follower: userId} },
                { new: true, upsert: true },
            );
            res.json({ following: userFollowing.following  });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new AccountController();
