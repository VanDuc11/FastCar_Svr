const lsgd = require('../models/LichSuGiaoDich.model');
const User = require('../models/user.model');
const NganHang = require('../models/NganHang.model');
var path = require('path');
const moment = require('moment');
const LichSuGiaoDichModel = require('../models/LichSuGiaoDich.model');
const ThongBao = require('../models/ThongBao');
const admin = require('firebase-admin');

class LSGDController {
    async index(req, res) {
        let check = { TrangThai: 0 };
        if (req.query.TrangThai != undefined && req.query.start_date == undefined && req.query.end_date == undefined) {
            check = { TrangThai: req.query.TrangThai.split(',') };


        } else if (req.query.start_date != undefined && req.query.end_date == undefined) {
            check = {
                "ThoiGian": {
                    $gte: new Date(req.query.start_date),
                    $lte: new Date(req.query.end_date),
                }
            };
        } else if (req.query.start_date != undefined && req.query.end_date && req.query.TrangThai != undefined) {
            check = {
                "ThoiGian": {
                    $gte: new Date(req.query.start_date),
                    $lte: new Date(req.query.end_date),
                }
            };
        }
        await lsgd.find(check)
            .populate({ path: 'User', model: 'User' })
            .populate({ path: 'NganHang', model: 'NganHang' }).sort({ _id: -1 })
            .then((result) => {
                res.status(200).render('ThanhToan', {
                    data: result.map(res => res.toJSON())
                })
            });
    }


    async chitietthanhtoan(req, res) {
        await lsgd.find({ _id: req.params.id })
            .populate({ path: 'User', model: 'User' })
            .populate({ path: 'NganHang', model: 'NganHang' })
            .sort({ _id: -1 })
            .then((result) => {

                res.status(200).render('ChiTietThanhToan', {
                    data: result.map(res => res.toJSON())
                })
            })

    }


    async Lichsugiaodich(req, res) {
        var check = { TrangThai: [1, 2] };
        if (req.query.TrangThai != undefined && req.query.start_date == undefined && req.query.end_date == undefined) {
            check = { TrangThai: req.query.TrangThai.split(',') };
        } else if (req.query.start_date != undefined && req.query.end_date != undefined && req.query.TrangThai == undefined) {
            check = {
                "ThoiGian": {
                    $gte: new Date(req.query.start_date),
                    $lte: new Date(req.query.end_date),
                },
                TrangThai: [1, 2]
            };
        } else if (req.query.start_date != undefined && req.query.end_date != undefined && req.query.TrangThai != undefined) {
            check = {
                "ThoiGian": {
                    $gte: new Date(req.query.start_date),
                    $lte: new Date(req.query.end_date),
                },
                TrangThai: req.query.TrangThai.split(',')
            };
        }
        await lsgd.find(check)
            .populate({ path: "User", model: "User" })
            .populate({ path: 'NganHang', model: 'NganHang' }).sort({ _id: -1 })
            .sort({ _id: -1 })
            .then((result) => {
                res.status(200).render("Lichsugiaodich", {
                    data: result.map((res) => res.toJSON()),
                });
            })
            .catch((error) => {
                res.status(400).json({
                    success: false,
                    message: error.message,
                });
            });
    }
    async CTLichSu(req, res) {
        await lsgd.find({ _id: req.params.id })
            .populate({ path: "User", model: "User" })
            .populate({ path: 'NganHang', model: 'NganHang' }).sort({ _id: -1 })
            .then((result) => {
                res.status(200).render('ChiTietLichSu', {
                    data: result.map((res) => res.toJSON()),
                })
            })
    }
    async duyetthanhtoan(req, res) {
        const id = req.params.id;
        const img = path.basename(req.file.path);
        await lsgd.findById(id)
            .then(async (result) => {
                const user = await User.findOne({ _id: result.User});
                lsgd.updateOne({ _id: id },
                    {
                        $set: {
                            TrangThai: req.params.trangthai,
                            HinhAnh: img
                        }
                    }
                ).then(async (resultu) => {
                    console.log(result);
                    const title = 'Thông báo thanh toán thành công';
                    const content = 'Yêu cầu thanh toán số tiền ' + result.SoTienGD + " VNĐ của bạn đã được đồng ý";
                    sendNotificationToUser(user.TokenFCM, title, content);

                    const thongbao = new ThongBao({
                        TieuDe: "Duyệt yêu cầu thanh toán thành công",
                        NoiDung: content,
                        User: result.User,
                        Type: 3
                    })
                    await thongbao.save();
                    res.status(201).send(`<script>alert("Thanh toán thành công"); window.location.href="/thanhtoan/ChiTietLichSu/${id}";</script>`);
                }).catch((err) => {
                    res.status(400).json({
                        success: false,
                        messages: err.messages
                    });
                })
            })

    }
    async TuChoithanhtoan(req, res) {
        const id = req.params.id;
        await lsgd.findById(id)
            .then(async (result) => {
                const user = await User.findOne({ _id: result.User});
                if (req.params.trangthai == 2 && result.title == 0) {
                    User.findOne({ _id: result.User._id }).then((result0) => {
                        User.updateOne({ _id: result.User._id },
                            {
                                $set: {
                                    SoDu: result0.SoDu + result.SoTienGD
                                }
                            }).then(() => {
                                console.log("từ chối thành công")
                            })
                    })

                }

                lsgd.updateOne({ _id: id },
                    {
                        $set: {
                            TrangThai: req.params.trangthai,
                        }
                    }
                ).then(async (resultu) => {
                    const title = 'Thông báo thanh toán thất bại';
                    const content = 'Yêu cầu thanh toán số tiền ' + result.SoTienGD + " của bạn đã bị từ chối";
                    sendNotificationToUser(user.TokenFCM, title, content);

                    const thongbao = new ThongBao({
                        TieuDe: "Duyệt yêu cầu thanh toán thất bại",
                        NoiDung: content + "\n\n Lý do: "+ req.body.NoiDung,
                        User: result.User,
                        Type: 3
                    })
                    await thongbao.save();
                    res.status(201).send(`<script>alert("Từ chối thành công"); window.location.href="/thanhtoan/ChiTietLichSu/${id}";</script>`);
                })
            }).catch((err) => {
                res.status(400).json({
                    success: false,
                    messages: err.messages
                });
            })

    }
    async findthanhtoan(req, res) {
        var check = {};

        if (req.query.start_date != undefined && req.query.end_date) {
            check = {
                "ThoiGian": {
                    $gte: new Date(req.query.start_date),
                    $lte: new Date(req.query.end_date),
                },

            };
        }

        await lsgd.find(check).sort({ _id: -1 })
            .then((result) => {

                res.status(200).json(result);
            });

    }

    async find_id(req, res) {
        await lsgd.findById(req.params.id).populate({ path: 'User', model: 'User' }).sort({ _id: -1 })
            .then((result) => {
                console.log(result);
                res.status(200).json(result)
            }).catch((error) => {
                res.status(400).json({
                    success: false,
                    message: 'Không thành công',
                })
            })
    }
    async getLSGD(req, res, next) {
        const check = {};
        let email = req.params.email;

        if (typeof (req.query.title) != 'undefined') {
            check.title = req.query.title;
        }

        if (typeof req.query.startDate !== 'undefined') {
            const queryDate = req.query.startDate;
            const parsedDate = moment(queryDate, 'MM/YYYY', true);

            if (parsedDate.isValid()) {
                const startDate = parsedDate.startOf('month').toDate();
                const endDate = parsedDate.endOf('month').toDate();

                check.ThoiGian = { $gte: startDate, $lt: endDate };
            } else {
                return res.status(400).json({ error: "Định dạng ngày tháng không hợp lệ" });
            }
        }

        const list = await lsgd.find(check).populate('User', ('_id UserName Email UID SDT Avatar NgayThamGia'))
            .populate({
                path: 'NganHang',
                populate: { path: 'User', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
            })
            .populate({
                path: 'HoaDon',
                populate: {
                    path: 'Xe',
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
                }
            })
            .populate({
                path: 'HoaDon',
                populate: { path: 'User', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
            }).sort({ _id: -1 });

        const filterList = list.filter(lsgd => lsgd.User.Email.toString() === email);

        return res.status(200).json(filterList);
    }

    async createLSGD(req, res, next) {
        try {
            const model = new lsgd(req.body);
            await model.save().then((result) => {
                return res.status(201).send({ success: true, message: 'Yêu cầu tạo mới thành công' });
            }).catch((err) => {
                res.status(400).json({
                    success: false,
                    messages: err.messages
                });
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

}

async function sendNotificationToUser(tokenFCM, title, body) {
    const message = {
        data: {
            title: String(title),
            body: String(body)
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

module.exports = new LSGDController;