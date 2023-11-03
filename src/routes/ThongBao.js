const express = require('express');
const router = express.Router();
const ThongBaoController = require('../app/controllers/ThongBaoCotroller');
 

// router.get('/',ThongBaoController.findNotifi);
// router.use('/list',ThongBaoController.index);
router.get('/',ThongBaoController.index);


module.exports = router; 