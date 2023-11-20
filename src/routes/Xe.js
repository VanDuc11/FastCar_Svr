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


router.get('/', XeControlles.index);
router.get('/Addxe',XeControlles.add);
router.get('/ChiTietXe/:id', XeControlles.chitietxe);
router.get('/ThongTinKhachThue/:id', XeControlles.Thongtin);
router.get('/demthoadon/:id', XeControlles.dem_hoa_don_HD);


router.get('/list', XeControlles.findXe);

// get theo trạng thái 0,1
router.get('/hoatdong', XeControlles.xe_Hd);
router.get('/khonghoatdong', XeControlles.xe_KHD);
router.get('/tuchoi', XeControlles.xe_TC);
router.get('/choduyen', XeControlles.xe_CD);
//get xe theo id 
router.get('/find_id/:id', XeControlles.findXe_id);

// get top 5 xe, trừ xe của user login
router.get('/top5xe/:email', XeControlles.find_top_5);

// get xe không thuộc user
router.get('/listXe_NotUser/:email', XeController.find_Xe_Not_User);

// get xe của user
router.get('/listXe_user/:email', XeControlles.find_Xe_User);

// duyệt xe
router.post('/duyet/:id/:trangthai', XeControlles.duyetxe);

router.post('/create', upload.fields([{ name: 'HinhAnh', maxCount: 4 }, { name: 'DangKyXe', maxCount: 1 }, { name: 'DangKiem', maxCount: 1 }, { name: 'BaoHiem', maxCount: 1 }]), XeControlles.CreateXe);

router.put('/update/:id', XeControlles.UpdateXe);

router.delete('/delete/:id', XeControlles.DeleteXe);


module.exports = router; 