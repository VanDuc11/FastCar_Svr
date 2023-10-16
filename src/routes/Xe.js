const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const XeControlles = require('../app/controllers/XeController');
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

router.get('/',XeControlles.index);
router.get('/listXe',XeControlles.findXe);
router.post('/createXe',upload.array('HinhAnh',4),XeControlles.CreateXe);
router.post('/updateXe/:id',upload.array('HinhAnh',4),XeControlles.UpdateXe);
router.post('/danhgiaXe',XeControlles.pushDanhGiaXe);
router.post('/delete/:id',XeControlles.DeleteXe);


module.exports = router; 