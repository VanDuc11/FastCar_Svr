const MaGiamGia = require('../models/MaGiamGia.model');
var path = require('path');
const crypto = require('crypto');
const dateNow = new Date();
const moment = require('moment');
const ThongBao = require('../models/ThongBao');
const { log } = require('console');

class MaGiamGiaController {
    async index(req, res) {

        try {
            await MaGiamGia.find().sort({ _id: -1 })
                .then((result) => {
                    res.status(200).render('KhuyenMai',
                        {
                            data: result.map((res) => res.toJSON())
                        })

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
    async DanhSach(req, res) {

        try {
            await MaGiamGia.find({ TrangThai: [true] }).sort({ _id: -1 })
                .then((result) => {
                    res.status(200).render('DanhSachVoucher',
                        {
                            data: result.map((res) => res.toJSON())
                        })

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
    async findMaGiaGia(req, res) {
        let check = null;
        if (typeof (req.query.MaGiamGia) != 'undefined') {
            check = { MaGiamGia: req.query.MaGiamGia };
        }
        try {
            await MaGiamGia.find(check).sort({ _id: -1 })
                .then((result) => {
                    res.status(200).json(result);

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
    async find_id(req,res){
        await MaGiamGia.findById(req.params.id)
        .then((result)=>{
            console.log(result);
            res.status(200).json(result)
        }).catch((error) => {
            res.status(400).json({
                success: false,
                message: 'Không thành công',
            })
        })
    }

    async CreateMaGiamGia(req, res) {
        const img = path.basename(req.file.path);
        const randomBytes = crypto.randomBytes(6);


        const maGiamGia = new MaGiamGia({
            TieuDe: req.body.TieuDe,
            MaGiamGia: req.body.MaGiamGia,
            GiaTri: req.body.GiaTri,
            GiaTriMax: req.body.GiaTriMax,
            NoiDung: req.body.NoiDung,
            HinhAnh: img,
            NgayBD: req.body.NgayBD,
            HSD: req.body.HSD,
            TrangThai: dateNow > new Date(req.body.HSD) ? false : true
        });


        try {
            const check = await MaGiamGia.findOne({ MaGiamGia: req.body.MaGiamGia });
            if (check == null) {
                const kq = await maGiamGia.save();

                console.log("maGiamGia", kq);
                // thêm vào thông báo
                if (kq) {
                    res.status(201)
                        .send('<script>alert("Thêm mã khuyến mãi thành công"); window.location.href="/khuyenmai";</script>');
                    const tb = new ThongBao({
                        TieuDe: req.body.TieuDe,
                        MaGiamGia: req.body.MaGiamGia,
                        GiaTri: req.body.GiaTri,
                        GiaTriMax: req.body.GiaTriMax,
                        NoiDung: req.body.NoiDung,
                        HinhAnh: img,
                    });

                    await tb.save().then((res) => {
                        console.log("Thong baoes", res);
                    })
                }

            } else {
                res.status(400)
                    .send('<script>alert("Mã khuyến mãi đã tồn tại"); window.location.href="/khuyenmai";</script>');
            }



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