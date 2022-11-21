const User = require('../models/User');

class UserController {
    async getUserDetail(req, res, next) {
        const { userId } = req.params;

        try {
            let user = await User.findById(userId);
            const{password,...mapUser} = user._doc
            res.json(mapUser);
        } catch (err) {
            console.log(err);
        }
    }

    async getAllUsers(req, res, next) {
        const {page, limit} = req.query
        try {
            const limitValue = limit ? +limit : 10
            const pageNumber = page ? +page : 1
            const skipAmount = pageNumber === 1 ? 0 : (pageNumber * limitValue) - 10;
            
            const users = await User.find({}).limit(limitValue).skip(skipAmount).select('-password');
            const countUsers = await User.countDocuments({})
            res.status(200).json({ users, countUsers});
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

}

module.exports = new UserController();
