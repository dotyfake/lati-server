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

}

module.exports = new UserController();
