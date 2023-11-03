const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const XeControlles = require('../app/controllers/XeController');
var multer = require('multer');
const XeController = require('../app/controllers/XeController');
var storage = multer.diskStorage({
    destination: (rep, file, cb) => {
        cb(null, 'src/public/images');
    },
    filename: (rep, file, cb) => {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage });

router.get('/danhsachxe',XeControlles.show);
router.get('/',XeControlles.index);
router.get('/ChiTietXe/:id',XeControlles.chitietxe);


// get top 5 xe, trừ xe của user login
router.get('/list',XeControlles.findXe);

router.get('/top5xe/:email',XeControlles.find_top_5);

// get xe không thuộc user
router.get('/listXe_NotUser/:email', XeController.find_Xe_Not_User);

// get xe của user
router.get('/listXe_user/:email',XeControlles.find_Xe_User);

router.post('/create',upload.array('HinhAnh',10),XeControlles.CreateXe);

router.post('/update/:id',upload.array('HinhAnh',10),XeControlles.UpdateXe);

router.delete('/delete/:id',XeControlles.DeleteXe);


module.exports = router; 