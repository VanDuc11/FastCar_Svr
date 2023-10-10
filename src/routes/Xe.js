const express = require('express');
const router = express.Router();
const XeControlles = require('../app/controllers/XeController');


router.get('/',XeControlles.index);

module.exports = router;