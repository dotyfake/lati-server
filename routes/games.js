const express = require('express');
const router = express.Router();
const GamesController = require('../controllers/gamesController')


router.get('/', GamesController.index)

module.exports = router
