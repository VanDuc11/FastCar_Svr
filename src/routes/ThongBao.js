const express = require('express');
const router = express.Router();
const ThongBaoController = require('../app/controllers/ThongBaoCotroller');
 

// router.get('/',ThongBaoController.findNotifi);
router.use('/',ThongBaoController.index);
 


module.exports = router; 