const express = require('express');
const crypto = require('crypto');
const router = express.Router();
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


router.get('/danhsachxe', XeController.show);
router.get('/', XeController.index);
router.get('/Addxe',XeController.add);
router.get('/ChiTietXe/:id', XeController.chitietxe);
router.get('/ThongTinKhachThue', XeController.Thongtin);

router.get('/list', XeController.findXe);

router.get('/findById/:id', XeController.findXe_byID);

// get top 5 xe, trừ xe của user login
router.get('/top5xe/:email', XeController.find_top_5);

// get xe không thuộc user
router.get('/listXe_NotUser/:email', XeController.find_Xe_Not_User);

// get xe của user
router.get('/listXe_user/:email', XeController.find_Xe_User);

// duyệt xe
router.post('/duyet/:id', XeController.duyetxe);

router.post('/create', upload.fields([{ name: 'HinhAnh', maxCount: 4 }, { name: 'DangKyXe', maxCount: 1 }, { name: 'DangKiem', maxCount: 1 }, { name: 'BaoHiem', maxCount: 1 }]), XeController.CreateXe);

router.put('/update/:id', XeController.UpdateXe);

router.put('/updateTrangThaiXe/:id', XeController.UpdateTrangThaiXe);

router.delete('/delete/:id', XeController.DeleteXe);


module.exports = router; 