const User = require('../models/user.model');
var path = require('path');



class LoginController {

    index(req, res) {

        res.render('login', { layout: 'temple_login' });
    }
    login(req, res, next) {
        let user = req.body.username;
        let pass = req.body.password;
        // lấy dữ liệu từ server
        User.findOne({ name: user, password: pass })
            .then((result) => {
                if (result) {
                    req.session.user = {result};
                    console.log(req.session.user);
                    // Nếu tìm thấy user và password trong cơ sở dữ liệu
                    res.redirect('/home');
                } else {
                    // Nếu không tìm thấy user và password trong cơ sở dữ liệu
                    res.render('login', { layout: 'temple_login' });
                    res.send('<script>alert("Thông tin không chính xác!"); window.location.href="/";</script>');
                }
            })
            .catch((err) => next(err));
        
    };

   
}

module.exports = new LoginController;