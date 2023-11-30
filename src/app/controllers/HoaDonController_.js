const { message } = require('statuses');
const HoaDon = require('../models/HoaDon.model');
const User = require('../models/user.model');
const Xe = require('../models/Xe.model');
var path = require('path');
const { log } = require('console');
const { parse } = require('querystring');
const admin = require('firebase-admin');

var serviceAccount = require("../../../myotp-76cf9-firebase-adminsdk-pgy17-f4b5071351.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const io = require("socket.io-client");
const socket = io("http://localhost:9001");


class HoaDonController_ {

   

    async index(req, res) {
        var query = null;
        const start_date = req.query.start_date;
        const end_date = req.query.end_date;
        const TrangThaiHD = req.query.TrangThaiHD;
        if (start_date != undefined &&
            end_date != undefined &&
            TrangThaiHD == undefined) {
            query = {
                "GioTaoHD": {
                    $gte: new Date(start_date),
                    $lte: new Date(end_date),
                },
            }
        } else if (TrangThaiHD != undefined &&
            start_date != undefined &&
            end_date != undefined) {
            query = {
                "GioTaoHD": {
                    $gte: new Date(start_date),
                    $lte: new Date(end_date),
                },
                "TrangThaiHD": TrangThaiHD.split(",")
            }


        } else if (TrangThaiHD != undefined &&
            start_date == undefined &&
            end_date == undefined) {
            query = {
                TrangThaiHD: TrangThaiHD.split(",")
            }

        }

        try {
            await HoaDon.find(query)
                .populate({
                    path: 'Xe',
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar')).sort({ _id: -1 })
                .then((result) => {

                    res.render('ChuyenXe', {
                        data: result.map((res) => res.toJSON())
                    })


                })
                .catch((error) => {
                    res.status(400).json({
                        success: false,
                        message: error.message,
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }


    //             })
    //             .catch((error) => {
    //                 res.status(400).json({
    //                     success: false,
    //                     message: error.message,
    //                 })
    //             })
    //     } catch (error) {
    //         res.status(500).json({
    //             success: false,
    //             message: error.message,
    //         })
    //     }
    // }
    async chuyen_dc(req, res) {
        try {
            await HoaDon.find({ TrangThaiHD: 3 })
                .populate({
                    path: 'Xe',
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar')).sort({ _id: -1 })
                .then((result) => {
                    res.render('ChuyenXe', {
                        data: result.map((res) => res.toJSON())
                    })


                })
                .catch((error) => {
                    res.status(400).json({
                        success: false,
                        message: error.message,
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    async chuyen_TC(req, res) {
        try {
            await HoaDon.find({ TrangThaiHD: 7 })
                .populate({
                    path: 'Xe',
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar')).sort({ _id: -1 })
                .then((result) => {
                    res.render('ChuyenXe', {
                        data: result.map((res) => res.toJSON())
                    })


                })
                .catch((error) => {
                    res.status(400).json({
                        success: false,
                        message: error.message,
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    async chuyen_CC(req, res) {
        try {
            await HoaDon.find({ TrangThaiHD: [1, 2] })
                .populate({
                    path: 'Xe',
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar')).sort({ _id: -1 })
                .then((result) => {
                    res.render('ChuyenXe', {
                        data: result.map((res) => res.toJSON())
                    })


                })
                .catch((error) => {
                    res.status(400).json({
                        success: false,
                        message: error.message,
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    async chuyen_Huy(req, res) {
        try {
            await HoaDon.find({ TrangThaiHD: 0 })
                .populate({
                    path: 'Xe',
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar')).sort({ _id: -1 })
                .then((result) => {
                    res.render('ChuyenXe', {
                        data: result.map((res) => res.toJSON())
                    })


                })
                .catch((error) => {
                    res.status(400).json({
                        success: false,
                        message: error.message,
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    async find_theoNgay(req, res) {

        // Tạo điều kiện tìm kiếm
        const query = {
            "GioTaoHD": {
                $gte: new Date(req.body.batdau),
                $lte: new Date(req.body.ketthuc),
            },
        };
        await HoaDon.find(query).populate({
            path: 'Xe',
            populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar', model: 'User' }
        }).populate('User', ('_id UserName Email UID SDT Avatar')).sort({ _id: -1 })
            .then((result) => {
                // console.log(result);
                res.render('ChuyenXe', {
                    data: result.map((res) => res.toJSON())
                })


            })
            .catch((error) => {
                res.status(400).json({
                    success: false,
                    message: error.message,
                })
            })
    }

    async chitietHD(req, res) {
        var id = req.params.id;

        await HoaDon.find({ _id: id })
            .populate({
                path: 'Xe',
                populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar', model: 'User' }
            }).populate('User')
            .then((result) => {
                // console.log(result);
                res.status(200).render('ChiTietChuyen',
                    {
                        data: result.map((res) => res.toJSON())
                    })
            })

    }
    async find_hoadon(req, res) {
        let check = {};

        if (typeof (req.query.Xe) != 'undefined') {
            check.Xe = req.query.Xe;
        }
        if (req.query.start_date != undefined && req.query.end_date) {
            check = {
                "GioTaoHD": {
                    $gte: new Date(req.query.start_date),
                    $lte: new Date(req.query.end_date),
                }
            };

        }

        if (typeof (req.query.User) != 'undefined') {
            check.User = req.query.User;
        }

        if (typeof (req.query.MaHD) != 'undefined') {
            check.MaHD = req.query.MaHD;
        }

        if (typeof (req.query.TrangThaiHD) !== 'undefined') {
            const trangthaiArray = req.query.TrangThaiHD.split(',');
            check.TrangThaiHD = { $in: trangthaiArray };
        }

        if (typeof (req.query.Xe) !== 'undefined') {
            const xeArray = req.query.Xe.split(',');
            check.Xe = { $in: xeArray }
        }

        if (typeof (req.query.TrangThaiHD) !== 'undefined' && typeof (req.query.User) != 'undefined') {
            const trangthaiArray = req.query.TrangThaiHD.split(',');
            check = { ...check, TrangThaiHD: trangthaiArray, User: req.query.User };
        }

        if (typeof (req.query.TrangThaiHD) !== 'undefined' && typeof (req.query.Xe) != 'undefined') {
            const xeArray = req.query.Xe.split(',');
            const trangthaiArray = req.query.TrangThaiHD.split(',');
            check = { ...check, TrangThaiHD: trangthaiArray, Xe: xeArray };
        }

        if (typeof req.query.startDate !== 'undefined' && typeof req.query.endDate !== 'undefined') {
            const startDate = new Date(req.query.startDate);
            const endDate = new Date(req.query.endDate);
            check = {
                ...check,
                NgayThue: { $lte: endDate },
                NgayTra: { $gte: startDate }
            }
        }

        try {
            await HoaDon.find(check)
                .populate({
                    path: 'Xe',
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar')).sort({ _id: -1 })
                .then((result) => {
                    res.status(200).json(result)
                })
                .catch((error) => {
                    res.status(400).json({
                        success: false,
                        message: error.message,
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }

    }

    async create_Hoadon(req, res) {
        const hoadon = new HoaDon({
            MaHD: req.body.MaHD,
            User: req.body.User,
            Xe: req.body.Xe,
            NgayThue: req.body.NgayThue,
            NgayTra: req.body.NgayTra,
            TongSoNgayThue: req.body.TongSoNgayThue,
            PhiDV: req.body.PhiDV,
            MaGiamGia: req.body.MaGiamGia,
            GiamGia: req.body.GiamGia,
            PhuPhi: req.body.PhuPhi,
            TongTien: req.body.TongTien,
            TienCoc: req.body.TienCoc,
            ThanhToan: req.body.ThanhToan,
            LoiNhan: req.body.LoiNhan,
            GioTaoHD: req.body.GioTaoHD,
            TimeChuXeXN: req.body.TimeChuXeXN,
            TrangThaiHD: 1,
            LyDo: "",
            HaveFeedback: false
        })
        try {
            const car = await Xe.findOne({ _id: hoadon.Xe });
            const chuSH = await User.findOne({ _id: car.ChuSH });

            let title = 'Yêu cầu thuê xe mới';
            let contentNotify = "Xe " + car.MauXe + " của bạn vừa có yêu cầu thuê xe. Vui lòng xác nhận hoặc huỷ!"
            // let url_image = "https:///fastcar-ulwr.onrender.com/public/images/" + car.HinhAnh[0];
            await hoadon.save().then((result) => {

                sendNotificationToUser(chuSH.TokenFCM, title, contentNotify);

                res.status(201).json({
                    success: true,
                    messages: "Yêu cầu tạo mới thành công"
                });
            })
                .catch((err) => {
                    res.status(400).json(err);
                    log(err);
                })
        } catch (error) {
            res.status(500).json(message)
        }

    }

    async update_TimeChuSHXN(req, res) {
        const maHD = req.params.maHD;
        const car = await Xe.findOne({ _id: req.body.Xe });
        // const chuSH = await User.findOne({ _id: car.ChuSH });
        const khachhang = await User.findOne({ _id: req.body.User });

        let trangthai = req.body.TrangThaiHD;

        await HoaDon.updateOne({ MaHD: maHD }, {
            $set: {
                TrangThaiHD: trangthai,
                TimeChuXeXN: req.body.TimeChuXeXN,
                User: req.body.User,
                Xe: req.body.Xe
            }
        }).then((result) => {
            if (trangthai == 2) {
                let title = 'Thông báo mới';
                let contentNotify = "Yêu cầu thuê xe " + car.MauXe + " của bạn đã được duyệt. Vui lòng đặt cọc để hoàn tất"
                // let url_image = "https://fastcar-ulwr.onrender.com/public/images/" + car.HinhAnh[0];
                sendNotificationToUser(khachhang.TokenFCM, title, contentNotify);
            }

            res.status(200).json("Sửa trạng thái HD thành công"
            );
        })
            .catch((err) => {
                res.status(400).json(err);
                log(err);
            })
    }

    async update_trangthaiDH(req, res) {
        const maHD = req.params.maHD;
        const car = await Xe.findOne({ _id: req.body.Xe });
        // const chuSH = await User.findOne({ _id: car.ChuSH });
        const khachhang = await User.findOne({ _id: req.body.User });

        let trangthai = req.body.TrangThaiHD;

        await HoaDon.updateOne({ MaHD: maHD }, {
            $set: {
                TrangThaiHD: trangthai,
                LyDo: req.body.LyDo,
                User: req.body.User,
                Xe: req.body.Xe,
                HaveFeedback: req.body.HaveFeedback
            }
        }).then((result) => {
            if (trangthai == 3) {
                // gửi socket đến ChuSH
                // socket.emit("payment_success", );
            }

            res.status(200).json("Sửa trạng thái HD thành công"
            );
        })
            .catch((err) => {
                res.status(400).json(err);
                log(err);
            })
    }

    async delete_allHD(req, res) {
        await HoaDon.deleteMany({});
        return res.status(200).json('Success');
    }

    async deleteItem(req, res) {
        await HoaDon.deleteOne({ _id: req.params.id });
        return res.status(200).json('Success');
    }
}

async function sendNotificationToUser(tokenFCM, title, body, image) {

    const message = {
        notification: {
            title: title,
            body: body
        },
        token: tokenFCM,
    };

    try {
        // Gửi thông báo
        await admin.messaging().send(message);
        console.log('Thông báo đã được gửi đến token:', tokenFCM);
    } catch (error) {
        console.error('Gửi thông báo thất bại:', error);
    }
}


module.exports = new HoaDonController_;