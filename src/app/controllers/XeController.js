const Xe = require('../models/Xe.model');
const User = require('../models/user.model');
const HoaDon = require('../models/HoaDon.model');
const ThongBao = require('../models/ThongBao');
var path = require('path');
const { log } = require('console');
const admin = require('firebase-admin');
const { el } = require('date-fns/locale');
const io = require("socket.io-client");
const socket = io("https://fast-car-fbfb5db0fb7f.herokuapp.com");

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
    async xe_VHD(req, res) {
        await Xe.find({ TrangThai: 4 })
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

    async findChiTiet(req, res) {
        await Xe.find({ _id: req.query.id }).populate({ path: 'ChuSH', model: 'User' }).sort({ _id: -1 })
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
        await Xe.findOneAndUpdate({ _id: id },
            {
                $set: {
                    TrangThai: req.params.trangthai
                }
            }
        ).populate({ path: 'ChuSH', model: 'User' })
            .then(async (result) => {
                const xe = await Xe.findOne({ _id: id }).populate('ChuSH', ('_id UserName Email UID SDT Avatar NgayThamGia'));

                if (req.params.trangthai == 1) {
                    const title = "Thông báo duyệt xe thành công";
                    const content = "Xe " + result.MauXe + result.BKS + " đã được duyệt";
                    sendNotificationToUser(result.ChuSH.TokenFCM, title, content, xe);
                    const thongbao = new ThongBao({
                        HinhAnh: result.HinhAnh[0],
                        TieuDe: title,
                        NoiDung: content,
                        User: result.ChuSH,
                        Xe: result,
                        Type: 0
                    });
                    await thongbao.save();
                    res.status(201).send(`<script>alert("Duyệt thành công"); window.location.href="/quanlyxe/ChiTietXe?id=${id}";</script>`);
                    socket.emit('updateCar', id);
                } else if (req.params.trangthai == 2) {
                    const title = "Thông báo từ chối xe";
                    const content = "Xe " + result.MauXe + result.BKS + " đã bị từ chối";
                    sendNotificationToUser(result.ChuSH.TokenFCM, title, content, xe);
                    const thongbao = new ThongBao({
                        HinhAnh: result.HinhAnh[0],
                        TieuDe: title,
                        NoiDung: content + "\nLý do: " + req.body.NoiDung,
                        User: result.ChuSH,
                        Xe: result,
                        Type: 0
                    });
                    await thongbao.save();
                    res.status(201).send(`<script>alert("Từ chối thành công"); window.location.href="/quanlyxe/ChiTietXe?id=${id}";</script>`);

                } else if (req.params.trangthai == 4) {
                    const title = "Thông báo xe bị vô hiệu hóa";
                    const content = "Xe " + result.MauXe + result.BKS + " đã bị vô hiệu hóa";
                    sendNotificationToUser(result.ChuSH.TokenFCM, title, content, xe);
                    const thongbao = new ThongBao({
                        HinhAnh: result.HinhAnh[0],
                        TieuDe: title,
                        NoiDung: content + "\nLý do: " + req.body.NoiDung,
                        User: result.ChuSH,
                        Xe: result,
                        Type: 0
                    });
                    await thongbao.save();
                    res.status(201).send(`<script>alert("Vô hiệu hóa thành công"); window.location.href="/quanlyxe/ChiTietXe?id=${id}";</script>`);
                    socket.emit('updateCar', id);
                }


            }).catch((err) => {
                res.status(400).json({
                    success: false,
                    messages: err.messages
                });
            })
    }


    async ChiTietXe(req, res) {
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

        await HoaDon.find({ Xe: req.query.id, TrangThaiHD: [3, 4, 5, 6] }).populate('Xe')
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

        await HoaDon.find({ Xe: req.query.id, TrangThaiHD: [3, 4, 5, 6] }).populate('Xe')
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
        res.render('addxe')
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

        const isPaginationRequested = 'page' in req.query && 'pageSize' in req.query;

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

            if (isPaginationRequested) {
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 10;
                const startIndex = (page - 1) * pageSize;
                const endIndex = page * pageSize;
                const dataPage = filteredList.slice(startIndex, endIndex);
                console.log("data: " + dataPage.length);
                return res.status(200).json(dataPage);
            } else {
                console.log("data: " + filteredList.length);
                return res.status(200).json(filteredList);
            }
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
            const list = await Xe.find(check).populate('ChuSH', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ SoChuyen: -1 }).limit(10).exec();

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
        const normalizedBKS = req.body.BKS.replace(/\s/g, '').replace('-', '').toUpperCase();
        const part1 = normalizedBKS.slice(0, 3);
        const part2 = normalizedBKS.slice(3);
        const formattedBKS = `${part1}-${part2.slice(0, 6)}`;

        const xeModel = await Xe.findOne({ BKS: formattedBKS });
        if (xeModel) {
            return res.status(303).send('<script>alert("Biển kiểm soát đã được sử dụng"); window.location.href="/quanlyxe";</script>');
        }
        const xe = new Xe({
            BKS: formattedBKS,
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
            TrangThai: 1,
            SoChuyen: 0,
            TrungBinhSao: 0,
            Latitude: req.body.Latitude || "21.017295",
            Longitude: req.body.Longitude || "105.783983",
            TheChap: false,
            ThoiGianGiaoXe: "07:00 - 22:00",
            ThoiGianNhanXe: "07:00 - 22:00",
            LichBan: []
        });

        try {
            await xe.save()
                .then((result) => {
                    res.status(201)
                        .send('<script>alert("Thêm xe thành công"); window.location.href="/quanlyxe";</script>');
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
        const normalizedBKS = req.body.BKS.replace(/\s/g, '').replace('-', '').toUpperCase();
        const part1 = normalizedBKS.slice(0, 3);
        const part2 = normalizedBKS.slice(3);
        const formattedBKS = `${part1}-${part2.slice(0, 6)}`;

        const xeModel = await Xe.findOne({ BKS: formattedBKS });
        if (xeModel) {
            return res.status(300).json({ success: true, message: 'Biển kiểm soát đã được sử dụng' });
        }

        const xe = new Xe({
            BKS: formattedBKS,
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
            TrungBinhSao: 0,
            LichBan: []
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
                        User: chush,
                        Type: 0
                    });
                    await thongBaoNew.save();
                })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        messages: err
                    });
                })

        } catch (error) {
            res.status(500).json({
                success: false,
                messages: error
            });
        }
    }

    async checkBKS_Xe(req, res) {
        const bks = req.body.BKS;
        const normalizedBKS = bks.replace(/\s/g, '').replace('-', '').toUpperCase();
        const part1 = normalizedBKS.slice(0, 3);
        const part2 = normalizedBKS.slice(3);
        const formattedBKS = `${part1}-${part2.slice(0, 6)}`;

        const xeModel = await Xe.findOne({ BKS: formattedBKS });
        if (xeModel) {
            return res.status(300).json({ success: true, message: 'Biển kiểm soát đã được sử dụng' });
        } else {
            return res.status(200).json({ success: true });
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
                        ThoiGianNhanXe: req.body.ThoiGianNhanXe,
                        LichBan: req.body.LichBan
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

async function sendNotificationToUser(tokenFCM, title, body, xe) {

    const message = {
        data: {
            title: String(title),
            body: String(body),
            xe: JSON.stringify(xe)
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
module.exports = new XeController;