const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/LSGDController');
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

router.get('/', controller.index);

router.get('/ChiTietThanhToan/:id', controller.chitietthanhtoan);
router.get('/Lichsugiaodich', controller.Lichsugiaodich);
router.get('/find/:id', controller.find_id);
router.get('/list', controller.getLSGD);
router.get('/loc', controller.findthanhtoan);
router.post('/duyet/:id/:trangthai', upload.single('HinhAnh'), controller.duyetthanhtoan);
router.post('/create', controller.createLSGD);

module.exports = router;