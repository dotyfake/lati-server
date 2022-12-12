const User = require('../models/User');

class SearchController {
    async searchUser(req, res, next) {
    const {payload} = req.query
    const regex = new RegExp(`${payload}`, 'i')
        try {
            let user = await User.find({
                $or:[ {displayName:regex}, {username:regex}]
            }).select('username avatar displayName bio');
            res.json(user);
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new SearchController();
