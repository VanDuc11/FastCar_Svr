const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const XeControlles = require('../app/controllers/XeController');
var multer = require('multer');
const XeController = require('../app/controllers/XeController');
var storage = multer.diskStorage({
    destination: (rep, file, cb) => {
        cb(null, 'src/public/images');
    },
    filename: (rep, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get('/danhsachxe', XeControlles.show);
router.get('/', XeControlles.index);
router.get('/ChiTietXe/:id', XeControlles.chitietxe);
router.get('/ThongTinKhachThue', XeControlles.Thongtin);

router.get('/list', XeControlles.findXe);

// get top 5 xe, trừ xe của user login
router.get('/top5xe/:email', XeControlles.find_top_5);

// get xe không thuộc user
router.get('/listXe_NotUser/:email', XeController.find_Xe_Not_User);

// get xe của user
router.get('/listXe_user/:email', XeControlles.find_Xe_User);

// duyệt xe
router.post('/duyet/:id', XeControlles.duyetxe);

router.post('/create', upload.fields([{ name: 'HinhAnh', maxCount: 4 }, { name: 'DangKyXe', maxCount: 1 }, { name: 'DangKiem', maxCount: 1 }, { name: 'BaoHiem', maxCount: 1 }]), XeControlles.CreateXe);

router.put('/update/:id', XeControlles.UpdateXe);

router.delete('/delete/:id', XeControlles.DeleteXe);


module.exports = router; 