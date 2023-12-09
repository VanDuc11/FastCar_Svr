const express = require('express');
const router = express.Router();
var middleware = require('../app/middleware/api_auth');
const controller = require('../app/controllers/FeedBackController');

router.get('/list', controller.getFeedBack);
router.post('/create', controller.createFeedBack);

module.exports = router;