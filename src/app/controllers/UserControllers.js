const { log } = require('console');
const User = require('../models/user.model');
const path = require('path');

class UserControlles {
    index(req, res) {
        res.render('Khachhang')
    }
    async user(req, res, next) {
        let check = null;

        if (typeof (req.query.Email) != 'undefined') {
            check = { Email: req.query.Email };
        }

        await User.find(check).sort({ _id: -1 })
            .then((result) => {
                res.status(200).json(result.length == 0 ? 'Không có dữ liệu' : result);
            });

    }

    // async findUserEmail(req, res) {
    //     const email = req.params.email;
    //     await User.find({ Email: email })
    //         .then((result) => {
    //             res.status(200).json(result.length == 0 ? 'Không có dữ liệu' : result);
    //         });
    // }

    async createrUser(req, res, next) {
        var UserName = req.body.userName;
        var Email = req.body.email;
        var UID = req.body.UID;
        var Pass = req.body.MatKhau;
        var NgayThamGia = req.body.NgayThamGia;

        const user = new User({
            UserName: UserName,
            Email: Email,
            UID: UID,
            MatKhau: Pass,
            NgayThamGia: NgayThamGia
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

    async login(req, res) {
        const {email, pass} = req.body;
        const user = await User.findOne({Email: email, MatKhau: pass});
        if(user) {
            return res.status(200).json('Đăng nhập thành công');
        } else {
            return res.status(500).json('Đăng nhập thất bại');
        }
    }

    async updateUser(req, res) {
        try {
            await User.updateOne({ Email: req.body.email },
                {
                    $set: {
                        UserName: req.body.UserName
                    }
                })
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        messages: "Yêu cầu cập nhật thành công"
                    });
                    console.log(result);
                })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        messages: 'Không thành công'
                    });
                })
        } catch (error) {
            res.status(500).send({
                success: false,
            });
        }
    }

    async updateProfile(req, res) {

        try {
            await User.updateOne({ Email: req.body.email },
                {
                    $set: {
                        UserName: req.body.UserName,
                        SDT: req.body.SDT,
                        NgaySinh: req.body.NgaySinh,
                        GioiTinh: req.body.GioiTinh,
                    }
                })
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        messages: "Yêu cầu cập nhật thành công"
                    });
                    console.log(result);
                })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        messages: 'Không thành công'
                    });
                })

        } catch (error) {
            res.status(500).send({
                success: false,
            });
        }
    }
    async UpCCCD(req, res) {
        const img = [];
        for (var i = 0; i < req.files.length; i++) {
            img.push(path.basename(req.files[i].path));
        }
        const CCCD = {
            HoTen: req.body.HoTen,
            SoCCCD: req.body.SoCCCD,
            NgayCap: req.body.NgayCap,
            NoiCap: req.body.NoiCap,
            DiaChi: req.body.DiaChi,
            HinhAnhCCCD: img,
        }
        console.log(CCCD);
        try {
            await User.updateOne({ Email: req.body.email }, {
                $set: {
                    CCCD: CCCD
                }

            }, { new: true }).then((result) => {
                res.status(201).json({
                    success: true,
                    messages: "Update thành công"
                });
                console.log(result);
            })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        messages: 'Không thành công'
                    });
                })
        } catch (error) {
            res.status(500).json({
                success: false,
                messages: error.messages
            });
        }
    }
    async UpGPLX(req, res) {
        const img = [];
        for (var i = 0; i < req.files.length; i++) {
            img.push(path.basename(req.files[i].path));
        }
        const GPLX = {
            HoTen: req.body.HoTen,
            SoGPLX: req.body.SoGPLX,
            NgayCap: req.body.NgayCap,
            DiaChi: req.body.DiaChi,
            HinhAnhGPLX: img,
        }
        console.log(GPLX);
        try {
            await User.updateOne({ Email: req.body.email }, {
                $set: {
                    GPLX: GPLX
                }

            }, { new: true }).then((result) => {
                res.status(201).json({
                    success: true,
                    messages: "Update thành công"
                });
                console.log(result);
            })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        messages: 'Không thành công'
                    });
                })
        } catch (error) {
            res.status(500).json({
                success: false,
                messages: error.messages
            });
        }
    }

}
module.exports = new UserControlles;