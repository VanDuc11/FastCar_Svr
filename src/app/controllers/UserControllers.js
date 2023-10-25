const { log } = require('console');
const User = require('../models/user.model');
const path = require('path');

class UserControlles {
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

    async findUserEmail(req, res) {
        await User.find({ Email: req.body.email })
            .then((result) => {
                res.status(200).json(result.length == 0 ? 'Không có dữ liệu' : result);
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

    async addNewFavoriteCar(req, res) {
        try {
            const userId = req.params.userId;
            const newCar = req.body;

            const user = await User.findById(userId);

            if (user) {
                user.FavoriteCar.push(newCar);
                await user.save();

                res.status(200).json({ message: "Thêm xe yêu thích thành công" });
            } else {
                res.status(404).json({ message: "Không tìm thấy người dùng" });
            }

        } catch (error) {
            log(error);
        }
    }

    async deleteFavoriteCar(req, res) {
        try {
            const userId = req.params.userId;
            const carId = req.params.carId; 

            // Tìm và cập nhật User
            const user = await User.findById(userId);

            if (user) {
                const index = user.FavoriteCar.findIndex(car => car.id === carId); // Tìm vị trí của xe yêu thích cần xóa trong mảng
                if (index !== -1) {
                    user.FavoriteCar.splice(index, 1);
                    await user.save();

                    res.status(200).json({ message: "Xóa xe yêu thích thành công"});
                } else {
                    res.status(404).json({ message: "Không tìm thấy xe yêu thích" });
                }
            } else {
                res.status(404).json({ message: "Không tìm thấy người dùng" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Đã xảy ra lỗi khi xóa xe yêu thích", error: error.message });
        }
    }
}
module.exports = new UserControlles;