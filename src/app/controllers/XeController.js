const Xe = require('../models/Xe');

class XeController {
    index(req,res){
        res.render('danhsachxe')
    }
}
module.exports = new XeController;