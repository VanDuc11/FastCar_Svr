const express = require('express');
const router = express.Router();
const UserControlles = require('../app/controllers/UserControllers');

var multer = require('multer');
const UserControllers = require('../app/controllers/UserControllers');
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
router.get('/ChiTietKhachHang',UserControlles.chitietkhachhang);
router.get('/ChiTietXeKH',UserControlles.chitietxekh);
router.get('/listXeKhachHang',UserControlles.listXeKhachHang);


router.get('/list', UserControlles.user);
// Duyệt GPLX
router.post('/duyet/:id/:trangthai', UserControlles.duyetGPLX);
router.post('/create',UserControlles.createrUser);

router.post('/login', UserControlles.login);

router.post('/logout/:email', UserControllers.logout);

router.put('/updateUser/:email',UserControlles.updateUser);

router.put('/updateSoDu/:email',UserControlles.updateSoDu);

router.put('/updateTTGPLX/:email',UserControlles.updateTTGPLX);

router.post('/upGplx/:email',upload.array('HinhAnh_GPLX',2),UserControlles.UpdateGPLX);

module.exports = router;