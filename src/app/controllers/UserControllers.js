const { log } = require('console');
const User = require('../models/user.model');
const path = require('path');
const moment = require('moment');

class UserControlles {
    async index(req, res) {
        const data = [];

        await User.find().sort({ _id: -1 })
            .then((result) => {
                result.forEach(item => {
                    const NgayThamGia = moment(item.NgayThamGia).format('DD/MM/YYYY', { locale: 'vi' });
                    const NgaySinh = moment(item.NgaySinh).format('DD/MM/YYYY', { locale: 'vi' });

                    const arr = {
                        _id: item._id,
                        UserName: item.UserName,
                        SDT: item.SDT,
                        NgaySinh: NgaySinh,
                        GioiTinh: item.GioiTinh,
                        Email: item.Email,
                        UID: item.UID,
                        DiaChi_GPLX: item.DiaChi_GPLX,
                        Avatar: item.Avatar,
                        NgayThamGia: NgayThamGia,
                        __v: item.__v,
                    }
                    console.log(item);
                    data.push(arr)
                });
                res.status(200).render('Khachhang', {
                    data: data
                })
            });
    }

    async chitietkhachhang(req, res) {
        var id = req.params.id;
        await User.find({ _id: id })
            .then((result) => {
                res.render('ChiTietKhachHang',
                    {
                        data: result.map((res) => res.toJSON())
                    })

            })
    }
    async user(req, res, next) {
        let check = null;

        if (typeof (req.query.Email) != 'undefined') {
            check = { Email: req.query.Email };
        }

        await User.find(check).sort({ _id: -1 })
            .then((result) => {
                res.status(200).json(result);
            });

    }

    async createrUser(req, res) {
        const user = req.body;

        const check = await User.findOne({ Email: user.Email });
        if (check) {
            res.status(200).json({
                success: true,
                message: "Email đã được sử dụng",
            });
        } else {
            const userModel = new User({
                UserName: user.UserName,
                Email: user.Email,
                UID: user.UID,
                MatKhau: user.MatKhau,
                Avatar: user.Avatar,
                NgayThamGia: user.NgayThamGia,
                SDT: '',
                NgaySinh: '',
                GioiTinh: '',
                So_GPLX: '',
                HoTen_GPLX: '',
                NgayCap_GPLX: '',
                DiaChi_GPLX: '',
                HinhAnh_GPLX: [],
                TrangThai_GPLX: 0,
                So_CCCD: '',
                NgayCap_CCCD: '',
                NoiCap_CCCD: '',
                SoDu: 0,
                TokenFCM: user.tokenFCM
            });

            console.log(userModel);
            await userModel.save()
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
        }

    }

    async login(req, res) {
        const { email, pass } = req.body;
        const user = await User.findOne({ Email: email, MatKhau: pass });
        if (user) {
            return res.status(200).json('Đăng nhập thành công');
        } else {
            return res.status(500).json('Đăng nhập thất bại');
        }
    }

    async logout(req, res) {
        let email = req.params.email;
        try {
            const user = await User.findOne({ Email: email });
            user.TokenFCM = null;
            await user.save();
            return res.status(200).json('Đăng xuất thành công');
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message)
        }

    }


    async updateUser(req, res) {
        const user = req.body;
        let email = req.params.email;

        try {
            await User.updateOne({ Email: email },
                {
                    $set: {
                        UserName: user.UserName,
                        SDT: user.SDT,
                        NgaySinh: user.NgaySinh,
                        GioiTinh: user.GioiTinh,
                        So_GPLX: user.So_GPLX,
                        HoTen_GPLX: user.HoTen_GPLX,
                        NgayCap_GPLX: user.NgayCap_GPLX,
                        DiaChi_GPLX: user.DiaChi_GPLX,
                        HinhAnh_GPLX: user.HinhAnh_GPLX,
                        So_CCCD: user.So_CCCD,
                        NgayCap_CCCD: user.NgayCap_CCCD,
                        NoiCap_CCCD: user.NoiCap_CCCD,
                        MatKhau: user.MatKhau,
                        Avatar: user.Avatar,
                        TokenFCM: user.TokenFCM
                    }
                })
                .then((result) => {
                    res.status(200).json({
                        success: true,
                        messages: "Yêu cầu cập nhật thành công"
                    });
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

    async updateSoDu(req, res) {
        const user = req.body;
        let email = req.params.email;

        try {
            await User.updateOne({ Email: email },
                {
                    $set: {
                        SoDu: user.SoDu
                    }
                })
                .then((result) => {
                    res.status(200).json({
                        success: true,
                        messages: "Yêu cầu cập nhật thành công"
                    });
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

    async updateTTGPLX(req, res) {
        const user = req.body;
        let email = req.params.email;

        try {
            await User.updateOne({ Email: email },
                {
                    $set: {
                        TrangThai_GPLX: user.TrangThai_GPLX
                    }
                })
                .then((result) => {
                    res.status(200).json({
                        success: true,
                        messages: "Yêu cầu cập nhật thành công"
                    });
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


    async UpdateGPLX(req, res) {
        let email = req.params.email;
        const img = [];
        for (var i = 0; i < req.files.length; i++) {
            img.push(path.basename(req.files[i].path));
        }

        const user = req.body;

        try {
            if(img.length == 0) {
                await User.updateOne({ Email: email }, {
                    $set: {
                        HoTen_GPLX: user.HoTen_GPLX,
                        So_GPLX: user.So_GPLX,
                        NgayCap_GPLX: user.NgayCap_GPLX,
                        DiaChi_GPLX: user.DiaChi_GPLX,
                        TrangThai_GPLX: 1
                    }
    
                }, { new: true }).then((result) => {
                    res.status(201).json({
                        success: true,
                        messages: "Update thành công"
                    });
                })
                    .catch((err) => {
                        res.status(400).json({
                            success: false,
                            messages: 'Không thành công'
                        });
                    })
            } else {
                await User.updateOne({ Email: email }, {
                    $set: {
                        HoTen_GPLX: user.HoTen_GPLX,
                        So_GPLX: user.So_GPLX,
                        NgayCap_GPLX: user.NgayCap_GPLX,
                        DiaChi_GPLX: user.DiaChi_GPLX,
                        HinhAnh_GPLX: img,
                        TrangThai_GPLX: 1
                    }
    
                }, { new: true }).then((result) => {
                    res.status(201).json({
                        success: true,
                        messages: "Update thành công"
                    });
                })
                    .catch((err) => {
                        res.status(400).json({
                            success: false,
                            messages: 'Không thành công'
                        });
                    })
            }

            
        } catch (error) {
            res.status(500).json({
                success: false,
                messages: error.messages
            });
        }
    }

}


module.exports = new UserControlles;