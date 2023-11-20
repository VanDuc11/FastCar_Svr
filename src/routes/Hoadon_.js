const express = require('express');
const router = express.Router();
const HoaDonController_ = require('../app/controllers/HoaDonController_');
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
router.get('/',HoaDonController_.index);
router.get('/hoatdong',HoaDonController_.chuyen_hd);
router.get('/dacoc',HoaDonController_.chuyen_dc);
router.get('/thanhcong',HoaDonController_.chuyen_TC);
router.get('/chococ',HoaDonController_.chuyen_CC);
router.get('/huy',HoaDonController_.chuyen_Huy);

router.get('/ChiTietChuyen/:id',HoaDonController_.chitietHD);
router.get('/list',HoaDonController_.find_hoadon);


router.post('/find_theoNgay',HoaDonController_.find_theoNgay);
router.post('/create',HoaDonController_.create_Hoadon);
// router.post('/find_user_hoadon',HoaDonController_.find_HoaDon_User);
router.post('/update_trangthaiHD/:maHD',HoaDonController_.update_trangthaiDH);
router.post('/update_timeXNHD/:maHD',HoaDonController_.update_TimeChuSHXN);
router.delete('/deleteAll', HoaDonController_.delete_allHD);
router.delete('/delete/:id', HoaDonController_.deleteItem);


module.exports = router;