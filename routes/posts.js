const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')
const PostsController = require('../controllers/postsController')


router.get('/getPosts',  PostsController.getPosts)

router.post('/createPost', verifyToken,  PostsController.createPost)

router.patch('/updateLike', verifyToken,  PostsController.updateLike)

router.post('/createComment', verifyToken,  PostsController.createComment)

module.exports = router
