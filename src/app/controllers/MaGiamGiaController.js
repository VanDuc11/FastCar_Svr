const MaGiamGia = require('../models/MaGiamGia.model');
var path = require('path');
const crypto = require('crypto');
const dateNow = new Date();

class MaGiamGiaController {
    index(req, res) {
        res.render('KhuyenMai')
    }
    
    async findMaGiaGia(req, res) {
        let check = null;
        if (typeof (req.query.MaGiamGia) != 'undefined') {
            check = { MaGiamGia: req.query.MaGiamGia };
        }
        try {
            await MaGiamGia.find(check).sort({ _id: -1 })
                .then((result) => {
                    // console.log(result);
                    res.status(200).json(
                        result.length == 0 ? 'Không có dữ liệu' : result
                    );

                }).catch((error) => {
                    res.status(400).json({
                        success: false,
                        message: 'Không thành công',
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }

    }

    async CreateMaGiamGia(req, res) {
        const img = path.basename(req.file.path);
        const randomBytes = crypto.randomBytes(6);
        const randomString = String.fromCharCode(...randomBytes);


        const maGiamGia = new MaGiamGia({
            TieuDe: req.body.TieuDe,
            MaGiamGia: req.body.MaGiamGia,
            Code: randomString,
            GiaTri: req.body.GiaTri,
            GiaTriMax: req.body.GiaTriMax,
            NoiDung: req.body.NoiDung,
            HinhAnh: img,
            NgayBD: req.body.NgayBD,
            HSD: req.body.HSD,
            TrangThai: dateNow > new Date(req.body.HSD) ? false : true
        });


        try {

            await maGiamGia.save()
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        messages: "Yêu cầu tạo mới thành công"
                    });
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
    async updateMaGiamGia(req, res) {
        const img = path.basename(req.file.path);
        try {
            await MaGiamGia.updateOne({ _id: req.body.id },
                {
                    $set: {
                        TieuDe: req.body.TieuDe,
                        MaGiamGia: req.body.MaGiamGia,
                        GiaTri: req.body.GiaTri,
                        GiaTriMax: req.body.GiaTriMax,
                        NoiDung: req.body.NoiDung,
                        HinhAnh: img,
                        NgayBD: req.body.NgayBD,
                        HSD: req.body.HSD,
                        TrangThai: dateNow > new Date(req.body.HSD) ? false : true
                    }
                })
                .then((result) => {
                    res.status(201).json({
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
    async UpdateTrangThai(req, res) {
        try {
            MaGiamGia.updateOne({ _id: req.body.id }, {
                $set: {
                    TrangThai: req.body.TrangThai,
                }
            }).then((result) => {
                res.status(201).json({
                    success: true,
                    messages: 'Yêu cầu thành công'
                })
            }).catch((error) => {
                res.status(400).json({
                    success: false,
                    messages: 'Yêu cầu không thành công'
                })
            })
        } catch (error) {
            res.status(500).json({
                success: false
            })
        }


    }

}
module.exports = new MaGiamGiaController;