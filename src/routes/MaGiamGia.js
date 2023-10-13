const express = require('express');
const router = express.Router();
const MaGiamGiaController = require('../app/controllers/MaGiamGiaController');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage });

router.get('/listVoucher',MaGiamGiaController.findMaGiaGia);
router.post('/createVoucher',upload.single('HinhAnh'),MaGiamGiaController.CreateMaGiamGia);
router.post('/updateVoucher',upload.single('HinhAnh'),MaGiamGiaController.updateMaGiamGia);
router.post('/updateTrangThai',MaGiamGiaController.UpdateTrangThai);


module.exports = router;