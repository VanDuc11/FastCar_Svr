const User = require('../models/user.model');
var path = require('path');



class LoginController {

    index(req, res) {

        res.render('login', { layout: 'temple_login' });
    }
    login(req, res) {
        var email = req.body.Email;
        var pass = req.body.MatKhau;
        // lấy dữ liệu từ server
        User.findOne({ Email: email, MatKhau: pass })
            .then((result) => {
                if (result) {
                    
                    // Nếu tìm thấy user và password trong cơ sở dữ liệu
                    res.redirect('/quanlyxe');
                } else {
                    // Nếu không tìm thấy user và password trong cơ sở dữ liệu
                    res.render('login', { layout: 'temple_login' });
                    res.send('<script>alert("Thông tin không chính xác!"); window.location.href="/";</script>');
                }
            })
            .catch((err) => console.log(err));

    };


}

module.exports = new LoginController;