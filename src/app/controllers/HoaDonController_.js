const HoaDon = require('../models/HoaDon');
var path = require('path');

class HoaDonController_ {

    async find_hoadon(req, res) {
        try {
            await HoaDon.find().sort({ _id: -1 })
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
                message: error.message,
            })
        }

    }
    async find_HoaDon_User(req, res) {
        try {
            await Xe.find().sort({ _id: -1 })
                .then((result) => {
                    res.status(200).json(
                        result.length == 0 ? 'Không có dữ liệu' : result
                    )
                })
                .catch((error) => {
                    res.status(400).json({
                        success: true,
                        message: err.message,
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
        
        const user = {
            UserName: req.body.UserName,
            Email: req.body.Email,
            UID: req.body.UID,
            HoTen: req.body.HoTen,
            SoCCCD: req.body.SoCCCD,
            SDT: req.body.SDT,
        }
        const xe = {
            BKS: req.body.BKS,
            HangXe: req.body.HangXe,
            MauXe: req.body.MauXe,
            ChuSH: req.body.ChuSH,
            SoGhe: req.body.SoGhe,
            HinhAnh: req.body.HinhAnh,
            Gia: req.body.Gia,
        }
        const tinvat = {
            Loai: req.body.Loai,
            TrangThai: req.body.TrangThai
        }


        const hoadon = new HoaDon({
            MaHD: req.body.MaHD,
            User: user,
            Xe: xe,
            NgayThue: req.body.NgayThue,
            NgayTra: req.body.NgayTra,
            MaGiamGia: req.body.MaGiamGia,
            GiamGia: req.body.GiamGia,
            TongTien:req.body.TongTien,
            PhiDV:req.body.PhiDV,
            TienCoc: req.body.TienCoc,
            PhuPhi: req.body.PhuPhi,
            ThanhToan: req.body.ThanhToan,
            TrangThaiDH: req.body.TrangThaiDH,
            // TrangThaiDH: { type: [Number] },
            TinVat: tinvat
        })
        try {
            await hoadon.save().then((result) => {
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
                message: error.message,
            })
        }

    }
}
module.exports = new HoaDonController_;