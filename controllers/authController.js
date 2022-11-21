const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();


class AuthController {
    // @route /POST/ api/auth/register
    // @desc register user
    async register(req, res) {
        const { username, password, displayName, gender } = req.body;

        // Validate username and password
        if (!username || !password || !displayName)
            return res.status(400).json({ success: false, message: 'Missing username or password or display name!' });

        try {
            const user = await User.findOne({ username: username });

            // Check username already taken
            if (user) return res.status(400).json({ success: false, message: 'Username already taken!' });

            // Created user
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({
                username: username,
                password: hashedPassword,
                displayName: displayName,
                gender: gender,
            });
            await newUser.save();

            // Return token
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
            res.json({
                message: 'User created successfully',
                id: newUser._id,
                username: newUser.username,
                displayName: newUser.displayName,
                avatar: newUser.avatar.avatarUrl,
                photos: newUser.photos,
                gender: newUser.gender,
                age: newUser.age,
                bio: newUser.bio,
                coin: newUser.coin,
                skills: newUser.skills,
                posts: newUser.posts,
                accessToken: accessToken,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Missing username or password!' });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ success: false, message: 'Username or password incorrect!' });

        try {
            //Check for existing user
            const user = await User.findOne({ username: username });
            if (!user) return res.status(400).json({ success: false, message: 'Username or password incorrect!' });

            // Username found
            const passwordValid = await argon2.verify(user.password, password);

            if (!passwordValid)
                return res.status(400).json({ success: false, message: 'Username or password incorrect!' });

            // Return token
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

            res.json({
                message: 'User logged in successfully!',
                id: user._id,
                username: user.username,
                displayName: user.displayName,
                avatar: user.avatar.avatarUrl,
                photos: user.photos,
                coin: user.coin,
                gender: user.gender,
                skills: user.skills,
                follower: user.follower,
                following: user.following,
                posts: user.posts,
                age: user.age,
                bio: user.bio,
                accessToken: accessToken,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

module.exports = new AuthController();
