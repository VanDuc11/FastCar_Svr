const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

//  homeController


router.get('/',homeController.Home);

module.exports = router;