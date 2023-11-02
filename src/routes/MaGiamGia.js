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
router.get('/',MaGiamGiaController.index)
router.get('/list',MaGiamGiaController.findMaGiaGia);
router.post('/create',upload.single('HinhAnh'),MaGiamGiaController.CreateMaGiamGia);
router.post('/update:id',upload.single('HinhAnh'),MaGiamGiaController.updateMaGiamGia);
router.post('/update_TrangThai',MaGiamGiaController.UpdateTrangThai);


module.exports = router;