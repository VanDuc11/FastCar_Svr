const express = require('express');
const router = express.Router();
const UserControlles = require('../app/controllers/UserControllers');

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

router.get('/',UserControlles.user);
router.post('/creater_user',UserControlles.createrUser);
router.post('/findUserEmail',UserControlles.findUserEmail);
router.post('/updateProfile',UserControlles.updateProfile);
router.post('/upCccd',upload.array('HinhAnh',2),UserControlles.UpCCCD);
router.post('/upGplx',upload.array('HinhAnh',2),UserControlles.UpGPLX);

module.exports = router;