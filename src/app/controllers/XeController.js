const Xe = require('../models/Xe.model');
const User = require('../models/user.model');
const HoaDon = require('../models/HoaDon.model');
var path = require('path');
const { log } = require('console');

class XeController {
    async index(req, res) {
        await Xe.find({ TrangThai: [0, 1] })
            .populate({ path: "ChuSH", model: "User" })
            .sort({ _id: -1 })
            .then((result) => {
                res.status(200).render("Quanlyxe", {
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

    async chitietxe(req, res) {
        await Xe.find({ _id: req.params.id }).populate({ path: 'ChuSH', model: 'User' }).sort({ _id: -1 })
            .then((result) => {
                console.log(result);

                res.status(200).render('ChiTietXe', {
                    data: result.map(res => res.toJSON())
                })
            })
            .catch((error) => {
                res.status(400).json({
                    success: true,
                    message: error.message,
                })
            })
    }
    async duyetxe(req, res) {
        const id = req.params.id;
        console.log(id);
        await Xe.updateOne({ _id: id },
            {
                $set: {
                    TrangThai: req.params.trangthai
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
    async show(req, res) {
        await Xe.find({})
            .populate({ path: "ChuSH", model: "User" })
            .sort({ _id: -1 })
            .then((result) => {

                res.status(200).render("danhsachxe", {
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

    async chitietxe(req, res) {
        await Xe.find({ _id: req.params.id }).populate({ path: 'ChuSH', model: 'User' }).sort({ _id: -1 })
            .then((result) => {
                console.log(result);

                res.status(200).render('ChiTietXe', {
                    data: result.map(res => res.toJSON())
                })
            })
            .catch((error) => {
                res.status(400).json({
                    success: true,
                    message: error.message,
                })
            })
    }
    async Thongtin(req, res) {
         
        await HoaDon.find({ Xe: req.params.id }).populate('Xe')
            .populate({
                path: 'Xe',
                populate: { path: 'ChuSH', model: 'User' }
            })
            .populate('User').sort({ _id: -1 })
            .then((result) => {
                res.status(200).render('ThongTinKhachThue', {
                    data: result.map(res => res.toJSON()),
                })
            })
    }
    add(req, res) {
        res.render('AddXe')
    }
    async findXeTrangThai0_1(req, res) {


        try {
            await Xe.find({ TrangThai: [0, 1] }).populate({ path: 'ChuSH', model: 'User' }).sort({ _id: -1 })
                .then((result) => {
                    res.status(200).json(result)
                })
                .catch((error) => {
                    res.status(400).json({
                        success: true,
                        message: error.message,
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: true,
                message: err.message,
            })
        }

    }
    async findXe_id(req, res) {
        let id = req.params.id;
        await Xe.findById(id)
            .populate('ChuSH', ('_id UserName Email UID SDT Avatar'))
            .then((result) => {
                res.json(result)
                console.log('findXe_id',result)
            })
    }
    async findXe(req, res) {
        let check = null;
        if (typeof (req.query.ChuSH) != 'undefined') {
            check = { User: req.query.ChuSH };
        }

        if (typeof (req.query.TrangThai) != 'undefined') {
            check = { TrangThai: req.query.TrangThai };
        }

        try {
            await Xe.find(check).populate('ChuSH', ('_id UserName Email UID SDT Avatar')).sort({ _id: -1 })
                .then((result) => {
                    res.status(200).json(result)
                })
                .catch((error) => {
                    res.status(400).json({
                        success: true,
                        message: error.message,
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: true,
                message: err.message,
            })
        }

    }

    async find_Xe_Not_User(req, res) {
        // get list xe không thuộc user login
        const emailUser = req.params.email;
        let check = null;
        if (typeof req.query.DiaChiXe !== 'undefined' && typeof (req.query.TrangThai) != 'undefined') {
            const regex = new RegExp(req.query.DiaChiXe, 'i'); // 'i' để không phân biệt chữ hoa chữ thường
            check = { DiaChiXe: regex, TrangThai: req.query.TrangThai };
        }

        if (typeof req.query.ChuSH !== 'undefined' && typeof (req.query.TrangThai) != 'undefined') {
            const regex = new RegExp(req.query.DiaChiXe, 'i'); // 'i' để không phân biệt chữ hoa chữ thường
            check = { DiaChiXe: regex, TrangThai: req.query.TrangThai };
        }

        try {
            const list = await Xe.find(check).populate('ChuSH', ('_id UserName Email UID SDT Avatar')).exec();

            const filteredList = list.filter(Xe => Xe.ChuSH.Email.toString() !== emailUser);

            if (filteredList.length !== 0) {
                return res.status(200).json(filteredList);
            } else {
                return res.status(400).json({
                    success: true,
                    message: "Không có dữ liệu",
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }


    async find_Xe_User(req, res) {
        const emailUser = req.params.email;

        try {
            const list = await Xe.find({}).populate('ChuSH', ('_id UserName Email UID SDT Avatar')).exec();

            const filteredList = list.filter(Xe => Xe.ChuSH.Email.toString() === emailUser);

            if (filteredList.length !== 0) {
                return res.status(200).json(filteredList);
            } else {
                return res.status(400).json({
                    success: true,
                    message: "Không có dữ liệu",
                })
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async find_top_5(req, res) {
        const emailUser = req.params.email;
        let check = null;

        if (typeof (req.query.TrangThai) != 'undefined') {
            check = { TrangThai: req.query.TrangThai };
        }

        try {
            // giới hạn 5 xe
            const list = await Xe.find(check).populate('ChuSH', ('_id UserName Email UID SDT Avatar')).sort({ SoChuyen: -1 }).limit(5).exec();

            // nếu trong 5 xe, user login có 2 xe thì list = 3
            const filteredList = list.filter(Xe => Xe.ChuSH.Email.toString() !== emailUser);

            if (filteredList.length !== 0) {
                return res.status(200).json(filteredList);
            } else {
                return res.status(400).json({
                    success: true,
                    message: "Không có dữ liệu",
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }

    }

    async CreateXe(req, res) {
        // const img = [];
        // for (var i = 0; i < req.files['HinhAnh'].length; i++) {
        //     img.push(path.basename(req.files['HinhAnh'].get[i].path));
        // }
        var check = req.body.ChuSH;
        const xe = new Xe({
            BKS: req.body.BKS,
            HangXe: req.body.HangXe,
            MauXe: req.body.MauXe,
            NSX: req.body.NSX,
            SoGhe: req.body.SoGhe,
            ChuyenDong: req.body.ChuyenDong,
            LoaiNhienLieu: req.body.LoaiNhienLieu,
            TieuHao: req.body.TieuHao,
            MoTa: req.body.MoTa,
            HinhAnh: req.files['HinhAnh'].map(file => file.filename),
            DangKyXe: req.files['DangKyXe'][0].filename,
            DangKiem: req.files['DangKiem'][0].filename,
            BaoHiem: req.files['BaoHiem'][0].filename,
            DiaChiXe: req.body.DiaChiXe,
            GiaThue1Ngay: req.body.GiaThue1Ngay,
            ChuSH: req.body.ChuSH || await User.findById("6513ad0281cfc8cdaaa6f728"),
            TrangThai: 0,
            SoChuyen: 0,
            TrungBinhSao: 0
        });

        try {
            await xe.save()
                .then((result) => {
                    res.status(201)
                        .send('<script>alert("Thêm mã khuyến mãi thành công"); window.location.href="/quanlyxe";</script>');
                    console.log(result);
                })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        messages: err.messages
                    });
                })

        } catch (error) {
            res.status(500).json({
                success: false,
                messages: error.messages
            });
        }
    }

    async UpdateXe(req, res) {
        const id = req.params.id;
        try {
            await Xe.findByIdAndUpdate({ _id: id },
                {
                    $set: {
                        TrangThai: req.body.TrangThai,
                        SoChuyen: req.body.SoChuyen,
                        TrungBinhSao: req.body.TrungBinhSao
                    }
                }
            )
                .then((result) => {
                    res.status(200).json({
                        success: true,
                        messages: "Yêu cầu cập nhât thành công"
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        messages: err.messages
                    });
                })

        } catch (error) {
            res.status(500).json({
                success: false,
                messages: error.messages
            });
        }
    }

    async DeleteXe(req, res) {
        const id = req.params.id;

        try {
            const document = await Xe.findById(id);
            Xe.deleteOne({ _id: document._id })
                .then((result) => {
                    console.log(`Deleted ${result.deletedCount}`);
                    res.status(200).json({ message: 'Car removed successfully' });
                })
            console.log(document._id);

        } catch (error) {
            console.log(error);

        }
    }

}
module.exports = new XeController;