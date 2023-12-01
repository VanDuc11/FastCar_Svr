const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');


var multer = require('multer');
var storage = multer.diskStorage({
    destination: (rep, file, cb) => {
        cb(null, 'src/public/images');
    },
    filename: (rep, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
router.post('/',loginController.login);

 


module.exports = router;