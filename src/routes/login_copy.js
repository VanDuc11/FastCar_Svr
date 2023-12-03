const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');


var multer = require('multer');
 
router.post('/',loginController.login);

 


module.exports = router;