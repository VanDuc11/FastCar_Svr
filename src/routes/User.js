const express = require('express');
const router = express.Router();
const UserControlles = require('../app/controllers/UserControllers');


router.get('/',UserControlles.user);
router.post('/creater_user',UserControlles.createrUser);

module.exports = router;