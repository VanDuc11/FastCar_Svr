const Xe = require('../models/Xe.model');
var path = require('path');

class XeController {
    async index(req, res) {
        let check = null;
        if (typeof (req.query.ChuSH) != 'undefined') {
            check = { User: req.query.ChuSH };
        }
        try {
            await Xe.find(check).populate({ path: 'ChuSH', model: 'User' }).sort({ _id: -1 })
                .then((result) => {
                    res.render('Quanlyxe', {
                        data: result.map(res => res.toJSON())
                    })
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

    show(req, res) {
        res.render('danhsachxe')
    }
  
    async chitietxe(req, res) {
        await Xe.find({_id:req.params.id}).populate({ path: 'ChuSH', model: 'User' }).sort({ _id: -1 })
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
    add(req, res) {
        res.render('AddXe')
    }
    async findXe(req, res) {
        let check = null;
        if (typeof (req.query.ChuSH) != 'undefined') {
            check = { User: req.query.ChuSH };
        }
        try {
            await Xe.find(check).populate({ path: 'ChuSH', model: 'User' }).sort({ _id: -1 })
                .then((result) => {
                    res.status(200).json(
                        result.length == 0 ? 'Không có dữ liệu' : result
                    )
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
    async find_Xe_User(req, res) {
        try {
            await Xe.find({
                "ChuSH.Email_ChuXe": req.body.Email_ChuXe

            }).sort({ _id: -1 })
                .then((result) => {
                    res.status(200).json(
                        result.length == 0 ? 'Không có dữ liệu' : result
                    )
                })
                .catch((error) => {
                    res.status(400).json({
                        success: true,
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
    async find_top_5(req, res) {
        try {
            await Xe.find({})
                .sort({ SoChuyen: -1 })
                .limit(5)
                .exec()
                .then((result) => {
                    res.status(200).json(
                        result.length == 0 ? 'Không có dữ liệu' : result
                    )
                })
                .catch((error) => {
                    res.status(400).json({
                        success: true,
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

    async CreateXe(req, res) {
        const img = [];
        for (var i = 0; i < req.files.length; i++) {
            img.push(path.basename(req.files[i].path));
        }

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
            HinhAnh: img,
            DiaChiXe: req.body.DiaChiXe,
            GiaThue1Ngay: req.body.GiaThue1Ngay,
            ChuSH: req.body.ChuSH,
            TrangThai: req.body.TrangThai,
        });
        try {
            await xe.save()
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        messages: "Yêu cầu tạo mới thành công"
                    });
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
        const img = [];
        for (var i = 0; i < req.files.length; i++) {
            img.push(path.basename(req.files[i].path));
        }
        try {
            await Xe.findByIdAndUpdate({ _id: id },
                {
                    $set: {
                        BKS: req.body.BKS,
                        HangXe: req.body.HangXe,
                        MauXe: req.body.MauXe,
                        NSX: req.body.NSX,
                        SoGhe: req.body.SoGhe,
                        ChuyenDong: req.body.ChuyenDong,
                        LoaiNhienLieu: req.body.LoaiNhienLieu,
                        TieuHao: req.body.TieuHao,
                        MoTa: req.body.MoTa,
                        HinhAnh: img,
                        DiaChiXe: req.body.DiaChiXe,
                        GiaThue1Ngay: req.body.GiaThue1Ngay,
                        TrangThai: req.body.TrangThai,
                        SoChuyen: req.body.SoChuyen
                    }
                }
            )
                .then((result) => {
                    res.status(201).json({
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
                    res.status(200).json({ message: 'User removed successfully' });
                })
            console.log(document._id);

        } catch (error) {
            console.log(error);

        }
    }

    async pushDanhGiaXe(req, res) {
        const DanhGia = {
            UserName: req.body.UserName,
            NoiDung: req.body.NoiDung,
            Sao: req.body.Sao,
        }
        console.log(DanhGia);
        try {
            await Xe.updateOne({ _id: req.body.id }, {
                $push: {
                    FeedBack: DanhGia
                }

            }, { new: true }).then((result) => {
                res.status(201).json({
                    success: true,
                    messages: "Đánh giá thành công"
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
module.exports = new XeController;