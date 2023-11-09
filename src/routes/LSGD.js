const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/LSGDController');

router.get('/list' , controller.getLSGD);
router.post('/create', controller.createLSGD);

module.exports = router;