const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')
const AccountController = require('../controllers/accountController')

router.put('/uploadAvatar', verifyToken,  AccountController.uploadAvatar)

router.post('/uploadPhoto', verifyToken,  AccountController.uploadPhoto)

router.delete('/deletePhoto', verifyToken,  AccountController.deletePhoto)

router.patch('/updateUser', verifyToken,  AccountController.updateUser)

router.patch('/updateStatus', verifyToken,  AccountController.updateStatus)

router.get('/getFollowingUser', verifyToken,  AccountController.getFollowingUser)

router.patch('/updateFollowingUser', verifyToken,  AccountController.updateFollowingUser)

module.exports = router
