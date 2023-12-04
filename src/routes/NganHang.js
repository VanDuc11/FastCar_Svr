const express = require('express');
const router = express.Router();
const NganHangController = require('../app/controllers/NganHangController');

router.get('/list/:email', NganHangController.getListNganHang);

router.post('/create', NganHangController.createNganHang);

router.put('/update/:id', NganHangController.updateNganHang);

router.delete('/delete/:id', NganHangController.deleteNganHang);

module.exports = router;