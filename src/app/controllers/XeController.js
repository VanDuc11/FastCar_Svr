const { log } = require('console');
const Xe = require('../models/Xe');
var path = require('path');
class XeController {
    index(req, res) {
        res.render('danhsachxe')
    }
    async findXe(req, res) {
        try {
            await Xe.find().sort({_id: -1})
                .then((result) => {
                    console.log(result);
                    res.status(200).json({
                        success: true,
                        data: result.length == 0 ? 'Không có bản ghi' : result
                    })
                })
                .catch((error) => {
                    res.status(400).json({
                        success: true,
                        message: err.message,
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: true,
                message: err.message,
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
        const img = [];
        for (var i = 0; i < req.files.length; i++) {
            img.push(path.basename(req.files[i].path));
        }
        try {
            await Xe.updateOne({ _id: req.body.id },
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
                        TrangThai: req.body.TrangThai,
                    }
                }
            )
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        messages: "Yêu cầu cập nhât thành công"
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
    async DeleteXe(req,res){
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