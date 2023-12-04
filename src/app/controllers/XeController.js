const Xe = require('../models/Xe.model');
const User = require('../models/user.model');
const HoaDon = require('../models/HoaDon.model');
const ThongBao = require('../models/ThongBao');
var path = require('path');
const { log } = require('console');

class XeController {
    async index(req, res) {
        await Xe.find()
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
    // xe hoạt động

    async xe_Hd(req, res) {
        await Xe.find({ TrangThai: 1 })
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
    // xe chờ không hđ

    async xe_KHD(req, res) {
        await Xe.find({ TrangThai: 3 })
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
    // xe chờ từ chối

    async xe_TC(req, res) {
        await Xe.find({ TrangThai: 2 })
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
    // xe chờ duyệt
    async xe_CD(req, res) {
        await Xe.find({ TrangThai: 0 })
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
                // console.log(result);

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
        // console.log(id);
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


    async chitietxe(req, res) {
        await Xe.find({ _id: req.params.id }).populate({ path: 'ChuSH', model: 'User' }).sort({ _id: -1 })
            .then((result) => {
                // console.log(result);

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

        await HoaDon.find({ Xe: req.params.id, TrangThaiHD: [3, 4, 5, 6] }).populate('Xe')
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
    async dem_hoa_don_HD(req, res) {

        await HoaDon.find({ Xe: req.params.id, TrangThaiHD: [3, 4, 5, 6] }).populate('Xe')
            .populate({
                path: 'Xe',
                populate: { path: 'ChuSH', model: 'User' }
            })
            .populate('User').sort({ _id: -1 })
            .then((result) => {
                res.status(200).json(result);
            })
    }
    add(req, res) {
        res.render('AddXe')
    }

    async findXe_id(req, res) {
        let id = req.params.id;
        await Xe.findById(id)
            .populate('ChuSH', ('_id UserName Email UID SDT Avatar NgayThamGia'))
            .then((result) => {
                res.json(result)
                // console.log('findXe_id',result)
            })
    }
    async findXe(req, res) {
        let check = {};
        if (typeof (req.query.ChuSH) != 'undefined') {
            check.User = req.query.ChuSH;
        }

        if (typeof (req.query.TrangThai) != 'undefined') {
            check.TrangThai = req.query.TrangThai;
        }

        if (typeof (req.query.HangXe) != 'undefined') {
            const hangXeArray = req.query.HangXe.split(',');
            check.HangXe = { $in: hangXeArray };
        }

        if (typeof (req.query.ChuyenDong) != 'undefined') {
            check.ChuyenDong = req.query.ChuyenDong;
        }

        if (typeof (req.query.LoaiNhienLieu) != 'undefined') {
            check.LoaiNhienLieu = req.query.LoaiNhienLieu;
        }

        if (typeof (req.query.TrungBinhSao) != 'undefined') {
            check.TrungBinhSao = req.query.TrungBinhSao;
        }

        // giá thuê
        if (typeof req.query.priceFrom !== 'undefined' && typeof req.query.priceTo !== 'undefined') {
            // Xử lý truy vấn theo khoảng giá trị
            const priceFrom = parseFloat(req.query.priceFrom);
            const priceTo = parseFloat(req.query.priceTo);

            if (!isNaN(priceFrom) && !isNaN(priceTo)) {
                check.GiaThue1Ngay = { $gte: priceFrom, $lte: priceTo };
            } else {
                return res.status(400).json({ error: 'Giá trị không hợp lệ' });
            }
        }

        // số ghế
        if (typeof req.query.soGheFrom !== 'undefined' && typeof req.query.soGheTo !== 'undefined') {
            // Xử lý truy vấn theo khoảng giá trị
            const soGheFrom = parseFloat(req.query.soGheFrom);
            const soGheTo = parseFloat(req.query.soGheTo);

            if (!isNaN(soGheFrom) && !isNaN(soGheTo)) {
                check.SoGhe = { $gte: soGheFrom, $lte: soGheTo };
            } else {
                return res.status(400).json({ error: 'Giá trị không hợp lệ' });
            }
        }

        // năm sản xuất
        if (typeof req.query.yearFrom !== 'undefined' && typeof req.query.yearTo !== 'undefined') {
            check.NSX = { $gte: req.query.yearFrom, $lte: req.query.yearTo };
        }

        try {
            await Xe.find(check).populate('ChuSH', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ _id: -1 })
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

    async findXe_byID(req, res) {
        let idXe = req.params.id;
        try {
            await Xe.findOne({ _id: idXe }).populate('ChuSH', ('_id UserName Email UID SDT Avatar NgayThamGia'))
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
        let check = {};
        let priceQueryHandled = false;

        if (typeof (req.query.TrangThai) != 'undefined') {
            check.TrangThai = req.query.TrangThai;
        }

        if (typeof (req.query.HangXe) != 'undefined') {
            const hangXeArray = req.query.HangXe.split(',');
            check.HangXe = { $in: hangXeArray };
        }

        if (typeof (req.query.ChuyenDong) != 'undefined') {
            check.ChuyenDong = req.query.ChuyenDong;
        }

        if (typeof (req.query.LoaiNhienLieu) != 'undefined') {
            check.LoaiNhienLieu = req.query.LoaiNhienLieu;
        }

        if (typeof (req.query.TrungBinhSao) != 'undefined') {
            check.TrungBinhSao = req.query.TrungBinhSao;
        }

        if (typeof (req.query.TheChap) != 'undefined') {
            check.TheChap = req.query.TheChap;
        }

        // giá thuê
        if (typeof req.query.priceFrom !== 'undefined' && typeof req.query.priceTo !== 'undefined') {
            // Xử lý truy vấn theo khoảng giá trị
            const priceFrom = parseFloat(req.query.priceFrom);
            const priceTo = parseFloat(req.query.priceTo);

            if (!isNaN(priceFrom) && !isNaN(priceTo)) {
                check.GiaThue1Ngay = { $gte: priceFrom, $lte: priceTo };
                priceQueryHandled = true;
            } else {
                return res.status(400).json({ error: 'Giá trị không hợp lệ' });
            }
        }

        if (!priceQueryHandled && typeof req.query.priceFrom !== 'undefined') {
            const priceFrom = parseFloat(req.query.priceFrom);
            if (!isNaN(priceFrom)) {
                check.GiaThue1Ngay = { $gte: priceFrom };
            } else {
                return res.status(400).json({ error: 'Giá trị không hợp lệ' });
            }
        }

        // số ghế
        if (typeof req.query.soGheFrom !== 'undefined' && typeof req.query.soGheTo !== 'undefined') {
            // Xử lý truy vấn theo khoảng giá trị
            const soGheFrom = parseFloat(req.query.soGheFrom);
            const soGheTo = parseFloat(req.query.soGheTo);

            if (!isNaN(soGheFrom) && !isNaN(soGheTo)) {
                check.SoGhe = { $gte: soGheFrom, $lte: soGheTo };
            } else {
                return res.status(400).json({ error: 'Giá trị không hợp lệ' });
            }
        }

        // năm sản xuất
        if (typeof req.query.yearFrom !== 'undefined' && typeof req.query.yearTo !== 'undefined') {
            check.NSX = { $gte: req.query.yearFrom, $lte: req.query.yearTo };
        }

        try {
            const list = await Xe.find(check).populate('ChuSH', ('_id UserName Email UID SDT Avatar NgayThamGia')).exec();

            const filteredList = list.filter(Xe => Xe.ChuSH.Email.toString() !== emailUser);

            console.log("data: " + filteredList.length);
            return res.status(200).json(filteredList);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
            console.log("error: " + error);
        }
    }

    async find_Xe_User(req, res) {
        let check = null;
        let trangThaiValues = [];
        const emailUser = req.params.email;

        if (typeof (req.query.TrangThai) !== 'undefined') {
            trangThaiValues = req.query.TrangThai.split(',').map(item => parseInt(item));
        }

        if (trangThaiValues.length > 0) {
            check = { TrangThai: { $in: trangThaiValues } };
        }


        try {
            const list = await Xe.find(check).populate('ChuSH', ('_id UserName Email UID SDT Avatar NgayThamGia')).exec();

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
            const list = await Xe.find(check).populate('ChuSH', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ SoChuyen: -1 }).limit(5).exec();

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
    async CreateXeForm(req, res) {

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
            TheChap: false,
            ChuSH: req.body.ChuSH || await User.findById("6513ad0281cfc8cdaaa6f728"),
            TrangThai: 0,
            SoChuyen: 0,
            TrungBinhSao: 0,
            Latitude: req.body.Latitude || "21.017295",
            Longitude: req.body.Longitude || "105.783983",
        });

        try {
            await xe.save()
                .then((result) => {
                    res.status(201)
                        .send('<script>alert("Thêm xe thành công"); window.location.href="/quanlyxe";</script>');
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
    async CreateXe(req, res) {
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
            Latitude: req.body.Latitude,
            Longitude: req.body.Longitude,
            GiaThue1Ngay: req.body.GiaThue1Ngay,
            TheChap: false,
            ThoiGianGiaoXe: req.body.ThoiGianGiaoXe,
            ThoiGianNhanXe: req.body.ThoiGianNhanXe,
            ChuSH: req.body.ChuSH,
            TrangThai: 0,
            SoChuyen: 0,
            TrungBinhSao: 0
        });

        try {
            await xe.save()
                .then(async (result) => {
                    const chush = await User.findOne({ _id: xe.ChuSH._id });
                    res.status(201).json({ success: true, message: 'Thêm xe thành công' });
                    const tieude = "Yêu cầu đăng kí xe đã được gửi!";
                    const noidung = "Chào thành viên " + chush.UserName + ", \n\n" +
                        "Yêu cầu đăng kí xe " + req.body.MauXe + " - " + req.body.BKS + " đã được gửi đến Ban quản lí ứng dụng FastCar.\n\n" +
                        "Thông tin xe sẽ được hiển thị trên ứng dụng sau khi được Ban quản lí kiểm duyệt.\n\n" +
                        "Chúng tôi sẽ thông báo kết quả đến bạn trong thời gian sớm nhất.\n\n" +
                        "Xin cảm ơn!";
                    const hinhanh = req.files['HinhAnh'][0].filename;
                    const thongBaoNew = new ThongBao({
                        TieuDe: tieude,
                        NoiDung: noidung,
                        HinhAnh: hinhanh,
                        User: chush
                    });
                    await thongBaoNew.save();
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
                        SoChuyen: req.body.SoChuyen,
                        TrungBinhSao: req.body.TrungBinhSao,
                        TheChap: req.body.TheChap,
                        ThoiGianGiaoXe: req.body.ThoiGianGiaoXe,
                        ThoiGianNhanXe: req.body.ThoiGianNhanXe
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

    async UpdateTrangThaiXe(req, res) {
        const id = req.params.id;
        try {
            await Xe.findByIdAndUpdate({ _id: id },
                {
                    $set: {
                        TrangThai: req.body.TrangThai
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

        } catch (error) {
            console.log(error);

        }
    }

}
module.exports = new XeController;