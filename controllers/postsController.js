const cloudinary = require('../utils/cloudinary');
const User = require('../models/User');
const Post = require('../models/Post');

class PostsController {

    async getPosts(req, res, next) {
        const {page, limit, following, profile, newPosts} = req.query

        
        try {
            const limitValue = limit ? +limit : 5
            const pageNumber = page ? +page : 1
            const skipAmount = pageNumber === 1 ? 0 : (pageNumber * limitValue) - 5;
            

            if(newPosts){
                const posts = await Post.find({}).limit(limitValue).skip(skipAmount).populate('user', 'displayName avatar').sort({createdAt: -1});
            const countPost = await Post.countDocuments({})
            res.status(200).json({posts, countPost});
        }
        
        if(following){
            const user = await User.findOne({_id: following})

                const posts = await Post.find({user : {$in: user.following}}).limit(limitValue).skip(skipAmount).populate('user', 'displayName avatar').sort({createdAt: -1});
            const countPost = await Post.countDocuments({user : {$in: user.following}})
            res.status(200).json({posts, countPost});
            }

        if(profile){
                const posts = await Post.find({user : profile}).limit(limitValue).skip(skipAmount).populate('user', 'displayName avatar').sort({createdAt: -1});
            const countPost = await Post.countDocuments({user : profile})
            res.status(200).json({posts, countPost});
            }


        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    async createPost(req, res, next) {
        const { photo, content } = req.body;
        const userId = req.userId;

        try {
            // Upload image to cloudinary
            const result = photo && await cloudinary.uploader.upload(photo);

            const data = {
                cloudinary_id: photo ? result.public_id : '',
                photoUrl: photo ? result.url : '',
                userId,
            };

            const newPost = new Post({
                photo: data,
                content: content,
                user: userId
            })

            const post = await newPost.populate('user', 'displayName avatar')

            newPost.save()

            const user = await User.findByIdAndUpdate(userId, { $push: { posts: newPost} }, { new: true, upsert: true });
            res.status(200).json({post: post});
        } catch (err) {
            console.log(err);
        }
    }

    async updateLike(req, res, next) {
        const { isLiked, postId, postUserId } = req.body;
        const userId = req.userId;

        
        try {
            const queryFilter = isLiked ? '$pull' : '$push';
            
            //update like in collection Post
            const post = await Post.findByIdAndUpdate(
                postId,
                { [queryFilter]: { like:  userId}  },
                { new: true },
                );

                    console.log(post.like, isLiked);
            res.json({like: post.like, postId: post._id});
        } catch (err) {
            console.log(err);
        }
    }

    async createComment(req, res, next) {
        const { postId, content } = req.body;
        const userId = req.userId;
        console.log(req.userId);

        const user = await User.findOne({_id: userId})
        const data = {
            nickname: user.displayName,
            avatarUrl: user.avatar.avatarUrl,
            content: content,
            userId: userId
        }
        
        try {
            //update like in collection Post
            const post = await Post.findByIdAndUpdate(
                postId,
                { $push: { comments:  data}  },
                { new: true },
                );
            res.json({comment: data, postId: post._id});
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new PostsController();
