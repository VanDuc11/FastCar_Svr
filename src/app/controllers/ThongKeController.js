const HoaDon = require('../models/HoaDon.model');
var path = require('path');

class ThongKeController{

    thongke(req, res) {
        res.render('Thongke')
    }
    top(req, res) {
        res.render('ThongKeTopXe')
    }
}
module.exports = new ThongKeController;