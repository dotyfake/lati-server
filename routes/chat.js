const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')
const ChatController = require('../controllers/chatController')


router.get('/getChatId/:receiverId',verifyToken,  ChatController.getChatId)

router.get('/getChats',verifyToken,  ChatController.getChats)

// router.get('/findChat', verifyToken, ChatController.findChat)

router.post('/createChat',verifyToken,  ChatController.createChat)

router.get('/getMessages/:chatId',verifyToken,  ChatController.getMessages)

router.post('/sendMessage',verifyToken,  ChatController.sendMessage)



module.exports = router
