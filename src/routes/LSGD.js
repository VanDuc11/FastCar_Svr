const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/LSGDController');




router.get('/',controller.thanhtoan);
router.get('/ChiTietThanhToan/:id',controller.chitietthanhtoan);

router.get('/list' , controller.getLSGD);
router.post('/create', controller.createLSGD);

module.exports = router;