const express = require('express');
const router = express.Router();
const ThongKeController = require('../app/controllers/ThongKeController');
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

router.get('/',ThongKeController.index);
router.get('/thongketheoThang',ThongKeController.thongkeTheoThang);
router.get('/thongkeHDtheoThang',ThongKeController.thongkeHDTheoThang);
router.get('/doanhthu',ThongKeController.doanhthu);
router.get('/donhang',ThongKeController.donhang);
router.get('/hoadonphamtram',ThongKeController.hoadonphanTram);
router.get('/doanhthungay',ThongKeController.doanhThuNgay);

 


module.exports = router;