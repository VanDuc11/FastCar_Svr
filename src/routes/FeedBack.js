const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/FeedBackController');

router.get('/list' ,controller.getFeedBack);
router.post('/create', controller.createFeedBack);

module.exports = router;