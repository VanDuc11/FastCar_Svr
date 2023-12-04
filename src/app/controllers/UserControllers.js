const { log } = require('console');
const User = require('../models/user.model');

const Xe = require('../models/Xe.model');

const ThongBao = require('../models/ThongBao');

const path = require('path');
const moment = require('moment');

class UserControlles {
    async index(req, res) {
        var query = null
        const start_date = req.query.start_date;
        const end_date = req.query.end_date;
        const TrangThai = req.query.TrangThai;
        const status = req.query.status;
        
         if (status != undefined &&
            start_date != undefined &&
            end_date != undefined) {
            query = {
                "NgayThamGia": {
                    $gte: new Date(start_date),
                    $lte: new Date(end_date),
                },
                TrangThai_GPLX: status.split(',')
            }



        }else if (status != undefined &&
            start_date == undefined &&
            end_date == undefined) {
            query = {
                TrangThai_GPLX: status.split(',')
            }

        }else if (start_date != undefined &&
            end_date != undefined &&
            TrangThai == undefined) {
            query = {
                "NgayThamGia": {
                    $gte: new Date(start_date),
                    $lte: new Date(end_date),
                },
            }
        } else if (TrangThai != undefined &&
            start_date != undefined &&
            end_date != undefined) {
            query = {
                "NgayThamGia": {
                    $gte: new Date(start_date),
                    $lte: new Date(end_date),
                },
                "DangXe": TrangThai.split(',')
            }

        }  else if (TrangThai != undefined &&
            start_date == undefined &&
            end_date == undefined) {
            query = {
                DangXe: TrangThai.split(',')
            }

        } 

        await User.find(query).sort({ _id: -1 })
            .then((result) => {

                res.status(200).render('Khachhang', {
                    data: result.map((res) => res.toJSON())
                })
            });
    }
    async duyetGPLX(req, res) {
        const id = req.params.id;
        await User.updateOne({ _id: id },
            {
                $set: {
                    TrangThai_GPLX: req.params.trangthai
                }
            }
        ).then(() => {
            res.status(200).json({
                success: true,
                messages: "Yêu cầu cập nhât thành công"
            })
        }).catch((err) => {
            res.status(400).json({
                success: false,
                messages: err.messages
            });
        })
    }
    async chitietkhachhang(req, res) {
        var id = req.query.id;
        await User.find({ _id: id })
            .then((result) => {
                res.render('ChiTietKhachHang',
                    {
                        data: result.map((res) => res.toJSON())
                    })

            })
    }
    async chitietxekh(req,res){
        var query ={};
        var id = req.query.id;
        const TrangThai = req.query.TrangThai;

        if (TrangThai != undefined ) {
            query= {ChuSH: id,TrangThai: TrangThai.split(",")}
            
        }else{
            query= {ChuSH: id}
        }

        Xe.find(query)
        .populate('ChuSH', ('_id UserName Email UID SDT Avatar'))
        .sort({ _id: -1 }).then((result) => {
            
            res.render('ThongTinXe',
                {
                    data: result.map((res) => res.toJSON())
                })

        })
    }
    async listXeKhachHang(req,res){
        var id = req.query.id;
        Xe.find({ChuSH: id})
        .sort({ _id: -1 }).then((result) => {
            
           res.json(result)

        })
    }
    async user(req, res, next) {
        let check = null;

        if (typeof (req.query.Email) != 'undefined') {
            check = { Email: req.query.Email };
        }
        if (typeof (req.query.id) != 'undefined') {
            check = { _id: req.query.id };
        }
        if (req.query.start_date != undefined && req.query.end_date) {
            check = {
                "NgayThamGia": {
                    $gte: new Date(req.query.start_date),
                    $lte: new Date(req.query.end_date),
                }
            };
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
                TokenFCM: user.tokenFCM,
                DangXe: false
            });

            await userModel.save()
                .then(async () => {
                    const tieude = "🎁 Chào mừng bạn tham gia cộng đồng FastCar. 🎁";
                    const noidung = "🎁 Thân tặng bạn mã code BANMOI, giảm giá 500,000đ cho chuyến đi đầu tiên trên FastCar. \n\n" +
                        "Mời bạn cùng xem qua các kinh nghiệm hữu ích và hướng dẫn các bước thuê xe trên FastCar nhé. \n\n" +
                        "Kinh nghiệm thuê xe hữu ích: \n\n" +
                        "Lựa chọn xe có đánh giá cao và nhiều chuyến đi \n\n" +
                        "Lựa chọn chủ xe có nhận xét tốt và phản hồi nhanh \n\n" +
                        "Lựa chọn xe có biểu tượng Đặt xe nhanh để tiết kiệm thời gian đợi duyệt \n\n" +
                        "Gửi nhiều yêu cầu thuê xe cùng lúc đến các chủ xe khác nhau \n\n" +
                        "Sử dụng mã khuyến mãi. Thanh toán đặt cọc sớm nhất để hoàn tất đặt xe \n\n" +
                        "Hy vọng bạn sẽ có những trải nghiệm thật tuyệt vời cùng chúng tôi.\n\n" +
                        "FastCar Team. 🎁";
                    const hinhanh = "khuyenmai_banmoi.png";
                    const ThongBaoNew = new ThongBao({
                        TieuDe: tieude,
                        NoiDung: noidung,
                        HinhAnh: hinhanh,
                        User: userModel
                    });
                    await ThongBaoNew.save();
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
            if (img.length == 0) {
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