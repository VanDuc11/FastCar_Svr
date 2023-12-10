const { message } = require('statuses');
const HoaDon = require('../models/HoaDon.model');
const User = require('../models/user.model');
const Xe = require('../models/Xe.model');
const LSGD = require('../models/LichSuGiaoDich.model');
const NganHang = require('../models/NganHang.model');
var path = require('path');
const { log } = require('console');
const { parse } = require('querystring');
const admin = require('firebase-admin');
const ThongBao = require('../models/ThongBao');
const moment = require('moment');

var serviceAccount = require("../../../myotp-76cf9-firebase-adminsdk-pgy17-f4b5071351.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

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
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ _id: -1 })
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
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ _id: -1 })
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
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ _id: -1 })
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
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ _id: -1 })
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
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ _id: -1 })
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
            populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
        }).populate('User', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ _id: -1 })
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
                populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
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
        let dateQueryHandled = false;

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
            dateQueryHandled = true;
        }

        if (!dateQueryHandled && typeof req.query.startDate !== 'undefined') {
            const queryDate = req.query.startDate;
            const parsedDate = moment(queryDate, 'MM/YYYY', true);

            if (parsedDate.isValid()) {
                const startDate = parsedDate.startOf('month').toDate();
                const endDate = parsedDate.endOf('month').toDate();

                check.NgayThue = { $gte: startDate, $lt: endDate };
            } else {
                return res.status(400).json({ error: "Định dạng ngày tháng không hợp lệ" });
            }
        }

        try {
            await HoaDon.find(check)
                .populate({
                    path: 'Xe',
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
                }).populate('User', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ _id: -1 })
                .then((result) => {
                    console.log("data: " + result.length);
                    return res.status(200).json(result);
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
            TienCocGoc: req.body.TienCocGoc,
            ThanhToan: req.body.ThanhToan,
            LoiNhan: req.body.LoiNhan,
            GioTaoHD: req.body.GioTaoHD,
            TimeChuXeXN: req.body.TimeChuXeXN,
            HinhAnhChuXeGiaoXe: [],
            HinhAnhKhachHangTraXe: [],
            TrangThaiHD: 1,
            LyDo: "",
            HaveFeedback: false
        })
        try {
            const car = await Xe.findOne({ _id: hoadon.Xe });
            const chuSH = await User.findOne({ _id: car.ChuSH });
            const khachhang = await User.findOne({ _id: req.body.User });

            let title = 'Yêu cầu thuê xe mới';
            let contentNotify = "Xe " + car.MauXe + " của bạn vừa có yêu cầu thuê xe. Vui lòng xác nhận hoặc huỷ!"
            await hoadon.save().then(async (result) => {

                sendNotificationToUser(chuSH.TokenFCM, title, contentNotify);
                const currentDateNgayNhan = new Date(req.body.NgayThue);
                const day = currentDateNgayNhan.getDate().toString().padStart(2, '0');
                const month = (currentDateNgayNhan.getMonth() + 1).toString().padStart(2, '0');
                const year = currentDateNgayNhan.getFullYear();
                const formattedDateNgayNhan = `${day}/${month}/${year}`;

                const currentDateNgayTra = new Date(req.body.NgayTra);
                const day1 = currentDateNgayTra.getDate().toString().padStart(2, '0');
                const month1 = (currentDateNgayTra.getMonth() + 1).toString().padStart(2, '0');
                const year1 = currentDateNgayTra.getFullYear();
                const formattedDateNgayTra = `${day1}/${month1}/${year1}`;

                const noidungNotify = "🚗 Xin chào chủ xe " + chuSH.UserName + ",\n" +
                    "Xe " + car.MauXe + ", " + car.BKS + " của bạn mới được khách hàng " + khachhang.UserName +
                    " gửi yêu cầu thuê trong " + req.body.TongSoNgayThue + " ngày, từ " + formattedDateNgayNhan + " đến " + formattedDateNgayTra + ".\n\n" +
                    "Bạn vui lòng xác nhận hoặc có thể huỷ chuyến nếu như xe của bạn đang có sự cố không mong muốn.\n\n" +
                    "Vui lòng bỏ qua thông báo này nếu bạn đã xác nhận/từ chối.\n\n" +
                    "Chúc bạn một ngày tốt lành.\n\n" +
                    "FastCar Team 🚘"
                const thongBao = new ThongBao({
                    TieuDe: "Yêu cầu thuê xe mới",
                    NoiDung: noidungNotify,
                    User: chuSH,
                    HinhAnh: car.HinhAnh[0],
                    HoaDon: hoadon,
                    Type: 1
                });
                await thongBao.save();

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
        }).then(async (result) => {
            if (trangthai == 2) {
                let title = 'Thông báo mới';
                let contentNotify = "Yêu cầu thuê xe " + car.MauXe + " của bạn đã được duyệt. Vui lòng đặt cọc để hoàn tất";
                sendNotificationToUser(khachhang.TokenFCM, title, contentNotify);
                const noidungNotify = "🚗 Xin chào khách hàng " + khachhang.UserName + ",\n" +
                    "Yêu cầu thuê xe " + car.MauXe + " của quý khách đã được chủ xe chấp nhận.\n\n" +
                    "Quý khách vui lòng thanh toán tiền cọc cho chuyến xe trước 1 tiếng kể từ thời gian thông báo này được gửi.\n\n" +
                    "Vui lòng bỏ qua thông báo này nếu quý khách đã thanh toán/từ chối.\n\n" +
                    "Chúc quý khách một ngày tốt lành.\n\n" +
                    "FastCar Team 🚘"
                const thongBao = new ThongBao({
                    TieuDe: "Yêu cầu thuê xe thành công!",
                    NoiDung: noidungNotify,
                    User: khachhang,
                    HinhAnh: car.HinhAnh[0],
                    HoaDon: req.body._id,
                    Type: 2
                });
                await thongBao.save();
            }

            return res.status(200).json({ message: "Sửa trạng thái HD thành công" });
        })
            .catch((err) => {
                res.status(400).json(err);
                log(err);
            })
    }

    async update_trangthaiDH(req, res) {
        const maHD = req.params.maHD;
        const car = await Xe.findOne({ _id: req.body.Xe });
        const chuSH = await User.findOne({ _id: car.ChuSH });
        const khachhang = await User.findOne({ _id: req.body.User });
        const hoadon = await HoaDon.findOne({ MaHD: maHD });
        const trangThaiHD_old = hoadon.TrangThaiHD;
        let trangthai = req.body.TrangThaiHD;

        await HoaDon.updateOne({ MaHD: maHD }, {
            $set: {
                TrangThaiHD: trangthai,
                LyDo: req.body.LyDo,
                User: req.body.User,
                Xe: req.body.Xe,
                HaveFeedback: req.body.HaveFeedback
            }
        }).then(async (result) => {
            if (trangthai == 0) {
                if (trangThaiHD_old == 3) {
                    // gửi yêu cầu hoàn tiền
                    const noidungLSGD = "Yêu cầu hoàn tiền cọc cho chuyến xe " + req.body.MaHD;
                    const nganHangKhachThue = await NganHang.findOne({ User: khachhang });
                    const lsgd = new LSGD({
                        MaLSGD: randomString(8),
                        User: khachhang,
                        SoTienGD: req.body.TienCoc,
                        ThoiGian: new Date(),
                        NoiDung: noidungLSGD,
                        TrangThai: 0,
                        HoaDon: hoadon,
                        NganHang: nganHangKhachThue,
                        title: 2,
                        HinhAnh: ""
                    });
                    await lsgd.save();
                    // send notifications
                    let title = 'Yêu cầu hoàn tiền cọc';
                    let contentNotify = "Yêu cầu hoàn tiền cọc";
                    sendNotificationToUser(khachhang.TokenFCM, title, contentNotify);

                    const noidungNotify = "🚗 Xin chào khách hàng " + khachhang.UserName + ",\n" +
                        "Yêu cầu thuê xe " + car.MauXe + "(" + hoadon.MaHD + ")" + " của quý khách đã đã bị huỷ bởi chủ xe.\n\n" +
                        "Vì quý khách đã thanh toán  tiền cọc rồi, nên toàn bộ số tiền đó sẽ được hoàn trả vào tài khoản ngân hàng của quý khách trong 1-2 ngày làm việc.\n\n" +
                        "Rất mong quý khách thông cảm về lần phục vụ không tốt này.\n\n" +
                        "Chúc quý khách một ngày tốt lành.\n\n" +
                        "FastCar Team 🚘"

                    const thongBao = new ThongBao({
                        TieuDe: "Huỷ đặt xe - Hoàn lại tiền",
                        NoiDung: noidungNotify,
                        User: khachhang,
                        HinhAnh: car.HinhAnh[0],
                        HoaDon: hoadon,
                        Type: 2
                    });
                    await thongBao.save();
                }
            } else if (trangthai == 3) {
                // gửi socket đến ChuSH

            } else if (trangthai == 4) {
                // gửi thông báo cho khách hàng
            } else if (trangthai == 5) {
                // gửi thông báo cho chủ xe
            } else if (trangthai == 6) {
                const sochuyen = car.SoChuyen;
                const soDu_old = chuSH.SoDu;
                const sotien = Math.ceil(req.body.TienCocGoc * 0.67);
                const noidungLSGD = "Thanh toán số tiền giao dịch từ chuyến đi " + req.body.MaHD;

                await Xe.updateOne({ _id: car._id }, {
                    $set: {
                        SoChuyen: sochuyen + 1
                    }
                });

                const lsgd = new LSGD({
                    MaLSGD: randomString(8),
                    User: chuSH,
                    SoTienGD: sotien,
                    ThoiGian: new Date(),
                    NoiDung: noidungLSGD,
                    TrangThai: 1,
                    HoaDon: hoadon,
                    title: 1,
                    HinhAnh: ""
                });
                await lsgd.save();
                await User.updateOne({ _id: chuSH }, {
                    SoDu: soDu_old + sotien
                })

            }

            return res.status(200).json("Sửa trạng thái HD thành công");
        })
            .catch((err) => {
                res.status(400).json(err);
                log(err);
            })
    }

    async update_HinhAnhChuXeGiaoXe(req, res) {
        const maHD = req.params.maHD;
        try {
            await HoaDon.updateOne({ MaHD: maHD }, {
                $set: {
                    TrangThaiHD: 4,
                    HinhAnhChuXeGiaoXe: req.files['HinhAnhChuXeGiaoXe'].map(file => file.filename),
                }
            })
                .then((result) => {
                    res.status(200).json({
                        success: true,
                        messages: "Yêu cầu cập nhât thành công"
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        messages: err
                    });
                })
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    async update_HinhAnhKhachHangTraXe(req, res) {
        const maHD = req.params.maHD;
        try {
            await HoaDon.updateOne({ MaHD: maHD }, {
                $set: {
                    TrangThaiHD: 5,
                    HinhAnhKhachHangTraXe: req.files['HinhAnhKhachHangTraXe'].map(file => file.filename),
                }
            })
                .then((result) => {
                    res.status(200).json({
                        success: true,
                        messages: "Yêu cầu cập nhât thành công"
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        messages: err
                    });
                })
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
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

async function sendNotificationToUser(tokenFCM, title, body) {

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

function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


module.exports = new HoaDonController_;