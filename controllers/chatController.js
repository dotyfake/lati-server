const Chat = require('../models/Chat');
const Message = require('../models/Message');

class PostsController {

    async getChatId(req, res, next) {
        const userId = req.userId
        const receiverId = req.params.receiverId

        try {
            const chatId = await Chat.findOne({members: {$all : [userId, receiverId]}}).select('_id')
            
            res.status(200).json({chatId});

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    async getChats(req, res, next) {
        const userId = req.userId

        try {
            const chats = await Chat.find({members: {$in : userId}}).populate('members', 'displayName avatar.avatarUrl')
            const listReceiver = chats.map(chat => ({
                chatId: chat._id,
                receiver: chat.members.find(member => {
                    return member._id+'' !== userId
                }),
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt,
            }))
            res.status(200).json({listReceiver});


        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    async createChat(req, res, next) {

        const userId = req.userId

        const chatMembers = [userId, req.query.receiverId]
        
        const newChat = new Chat({
            members: chatMembers,
          });                                                                           
          try {
            //Check for existing and create chat
            const chat = await Chat.findOne({members: {$all : chatMembers}})
            let resultChat
            if(!chat){
                resultChat = await newChat.save();
            }
            res.status(200).json({resultChat});
          } catch (error) {
            res.status(500).json(error);
          }
    }

    async sendMessage(req, res, next) {
        const userId = req.userId
        const {chatId, text} = req.body
        const newMessage = new Message({
            senderId: userId,
            chatId,
            text,
        })
        try {
            let result = await newMessage.save();
            res.status(200).json({result});

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    async getMessages(req, res, next) {
        const chatId = req.params.chatId;
        try {
            let messages = await Message.find({chatId: chatId})
            res.status(200).json({messages});

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    
}

module.exports = new PostsController();
