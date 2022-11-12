const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/searchController')

router.get('/',  SearchController.searchUser)


module.exports = router
