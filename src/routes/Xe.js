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
router.get('/danhsachxe',XeControlles.show);

router.get('/ChiTietXe/:id',XeControlles.chitietxe);
router.get('/AddXe',XeControlles.add);
router.get('/',XeControlles.index);
router.get('/list',XeControlles.findXe);
router.get('/top5xe',XeControlles.find_top_5);
router.post('/listXe_user',XeControlles.find_Xe_User);
router.post('/create',upload.array('HinhAnh',10),XeControlles.CreateXe);
router.post('/update/:id',upload.array('HinhAnh',10),XeControlles.UpdateXe);
router.post('/delete/:id',XeControlles.DeleteXe);


module.exports = router; 