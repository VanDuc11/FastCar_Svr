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

router.get('/listhoadon',HoaDonController_.find_hoadon);
router.post('/createhoadon',HoaDonController_.create_Hoadon);
 


module.exports = router;