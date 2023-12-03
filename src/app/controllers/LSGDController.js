const lsgd = require('../models/LichSuGiaoDich.model');
const User = require('../models/user.model');
const NganHang = require('../models/NganHang.model');
var path = require('path');
const LichSuGiaoDichModel = require('../models/LichSuGiaoDich.model');
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
                console.log(result);

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
        await lsgd.updateOne({ _id: id },
            {
                $set: {
                    TrangThai: req.params.trangthai,
                    HinhAnh: img
                }
            }
        ).then(() => {
            res.status(201).send(`<script>alert("Thanh toán thành công"); window.location.href="/thanhtoan/ChiTietLichSu/${id}";</script>`);  

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
        let check = null;
        if (typeof (req.query.User) != 'undefined') {
            check = { User: req.query.User };
        }

        await lsgd.find(check).populate('User', ('_id UserName Email UID SDT Avatar'))
            .populate({
                path: 'NganHang',
                populate: { path: 'User', select: '_id UserName Email UID SDT Avatar', model: 'User' }
            })
            .populate({
                path: 'HoaDon',
                populate: {
                    path: 'Xe',
                    populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar', model: 'User' }
                }
            })
            .populate({
                path: 'HoaDon',
                populate: { path: 'User', select: '_id UserName Email UID SDT Avatar', model: 'User' }
            }).sort({ _id: -1 })
            .then((result) => {
                res.status(200).json(result);
            });

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

module.exports = new LSGDController;