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

router.get('/',ThongKeController.thongke);
router.get('/ThongKeTopXe',ThongKeController.top);
// router.get('/list',HoaDonController_.find_hoadon);
// router.post('/create',HoaDonController_.create_Hoadon);
// router.post('/find_user_hoadon',HoaDonController_.find_HoaDon_User);
// router.post('/update_trangthaiHD/:id',HoaDonController_.update_trangthaiDH);
 


module.exports = router;