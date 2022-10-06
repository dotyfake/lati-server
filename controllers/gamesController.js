const Games = require("../models/Games");

class GamesController {

    index(req, res, next){
      Games.find({})
      .then(games => res.json(games))
      .catch(next)
      }
  
}

module.exports = new GamesController();
