const express = require('express');
const router = express.Router();
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
router.get('/', UserControllers.index);
router.get('/ChiTietKhachHang', UserControllers.chitietkhachhang);
router.get('/ChiTietXeKH', UserControllers.chitietxekh);
router.get('/listXeKhachHang', UserControllers.listXeKhachHang);


router.get('/list', UserControllers.user);
// Duyệt GPLX
router.post('/duyet/:id/:trangthai', UserControllers.duyetGPLX);
router.post('/create', UserControllers.createrUser);

// router.post('/login', UserControllers.login);

// router.post('/loginwithgoogle/:token', UserControllers.login_with_google);

router.post('/logout/:email', UserControllers.logout);

router.put('/updateUser/:email', UserControllers.updateUser);

router.put('/updateNumberNotifyRead/:email', UserControllers.updateReadNotify);

router.put('/updateSoDu/:email', UserControllers.updateSoDu);

router.put('/updateTTGPLX/:email', UserControllers.updateTTGPLX);

router.post('/upGplx/:email', upload.array('HinhAnh_GPLX', 2), UserControllers.UpdateGPLX);

module.exports = router;