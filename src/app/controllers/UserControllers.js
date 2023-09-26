const User = require('../models/user');
class UserControlles {
    async user(req, res, next) {
        await User.find({})
            .then((result) => {
                res.status(200).json({
                    success: true,
                    data: result,
                });
            });
    }
    async createrUser(req, res, next) {
        var UserName = req.body.userName;
        var Email = req.body.email;
        var UID = req.body.UID;
        

        const user = new User({
            UserName: UserName,
            Email: Email,
            UID: UID,
            NgayThamGia: new Date()
        });

        User.findOne({ Email: Email })
            .then(async (resoult) => {
                if (resoult == null) {
                    await user.save()
                        .then(() => {
                            res.status(200).json({
                                success: true,
                                message: "Yêu cầu đăng ký thành công",
                            });
                        })
                        .catch((err) => {
                            res.status(500).json({
                                success: false,
                                message: err.message,
                            });
                        });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Yêu cầu đăng nhập thành công",
                    });
                }
            })

    }
}
module.exports = new UserControlles;