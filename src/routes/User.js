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
router.get('/',UserControlles.index);

router.get('/list', UserControlles.user);

router.post('/create',UserControlles.createrUser);

router.post('/login', UserControlles.login);

// router.get('/findUserEmail/:email',UserControlles.findUserEmail);

router.post('/update_Profile',UserControlles.updateProfile);

router.post('/updateUser',UserControlles.updateUser);


router.post('/upGplx',upload.array('HinhAnh',2),UserControlles.UpGPLX);

module.exports = router;