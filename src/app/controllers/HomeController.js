const HoaDon = require('../models/HoaDon.model');
var path = require('path');

class HomeController{

    Home(req, res) {
        res.render('Home')
    }
   
}
module.exports = new HomeController;