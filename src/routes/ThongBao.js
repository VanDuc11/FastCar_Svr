const express = require('express');
const router = express.Router();
const ThongBaoController = require('../app/controllers/ThongBaoCotroller');
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



router.get('/',ThongBaoController.index);
router.get('/find/:id',ThongBaoController.find_id);
router.post('/create',upload.single('HinhAnh'),ThongBaoController.CreateThongBao);

module.exports = router; 