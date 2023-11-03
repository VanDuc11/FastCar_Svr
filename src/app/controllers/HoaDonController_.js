const { message } = require('statuses');
const HoaDon = require('../models/HoaDon.model');
var path = require('path');
const { log } = require('console');

class HoaDonController_ {
    index(req, res) {
        res.render('ChuyenXe')
    }
    async find_hoadon(req, res) {
        let check = null;
        let trangThaiValues = [];

        if (typeof (req.query.Xe) != 'undefined') {
            check = { Xe: req.query.Xe };
        }

        if (typeof (req.query.User) != 'undefined') {
            check = { User: req.query.User };
        }

        if (typeof (req.query.TrangThaiHD) !== 'undefined') {
            trangThaiValues = req.query.TrangThaiHD.split(',').map(item => parseInt(item));
        }

        if (trangThaiValues.length > 0) {
            check = { TrangThaiHD: { $in: trangThaiValues } };
        }

        if (trangThaiValues.length > 0 && typeof (req.query.User) != 'undefined') {
            check = { TrangThaiHD: { $in: trangThaiValues }, User: req.query.User };
        }

        try {
            await HoaDon.find(check).populate('Xe')
                .populate({
                    path: 'Xe',
                    populate: { path: 'ChuSH', model: 'User' }
                })
                .populate('User').sort({ _id: -1 })
                .then((result) => {
                    res.status(200).json(
                        result.length == 0 ? 'Không có dữ liệu' : result
                    )
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

    // async find_HoaDon_User(req, res) {
    //     try {
    //         await HoaDon.find({
    //             "User.Email": req.body.Email
    //         }).sort({ _id: -1 })
    //             .then((result) => {
    //                 res.status(200).json(
    //                     result.length == 0 ? 'Không có dữ liệu' : result
    //                 )
    //             })
    //             .catch((error) => {
    //                 res.status(400).json({
    //                     success: true,
    //                     message: err.message,
    //                 })
    //             })
    //     } catch (error) {
    //         res.status(500).json({
    //             success: false,
    //             message: error.message,
    //         })
    //     }
    // }

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
            TrangThaiHD: req.body.TrangThaiHD,
            LyDo: ""
        })
        try {
            await hoadon.save().then((result) => {
                res.status(201).json({
                    success: true,
                    messages: "Yêu cầu tạo mới thành công"
                });
            })
                .catch((err) => {
                    res.status(400).json( err );
                    log(err);
                })
        } catch (error) {
            res.status(500).json( message )
        }

    }
    
    async update_trangthaiDH(req, res) {
        const maHD = req.params.maHD;
        await HoaDon.updateOne({ MaHD: maHD }, {
            $set: {
                TrangThaiHD: req.body.TrangThaiHD,
                LyDo: req.body.LyDo
            }
        }).then((result) => {
            res.status(200).json({
                success: true,
                messages: "Sửa trạng thái HD thành công"
            });
        })
            .catch((err) => {
                res.status(400).json( err );
                log(err);
            })
    }

    async delete_allHD(req, res) {
        await HoaDon.deleteMany({});
        return res.status(200).json('Success');
    }
}


module.exports = new HoaDonController_;