const NganHang = require('../models/NganHang.model');

class NganHangController {
    async getListNganHang(req, res) {
        let email = req.params.email;

        try {
            const list = await NganHang.find().populate('User', ('_id UserName Email UID SDT Avatar NgayThamGia')).exec();

            const filteredList = list.filter(NH => NH.User.Email.toString() === email);
            return res.status(200).json(filteredList);

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async createNganHang(req, res) {
        const nganhang = req.body;
        const check = await NganHang.findOne({ SoTK: nganhang.SoTK, TenNH: nganhang.TenNH });
        if (check) {
            res.status(203).json({
                success: true,
                message: "Số tài khoản đã tồn tại",
            });
        } else {
            const nhModel = new NganHang({
                TenNH: nganhang.TenNH,
                TenChuTK: nganhang.TenChuTK,
                SoTK: nganhang.SoTK,
                User: nganhang.User
            })
            await nhModel.save().then(() => {
                res.status(201).json({
                    success: true,
                    message: "Thêm STK thành công",
                });
            })
                .catch((err) => {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                });
        }
    }

    async updateNganHang(req, res) {
        const id_bank = req.params.id;
        await NganHang.updateOne({ _id: id_bank }, {
            TenNH: req.body.TenNH,
            TenChuTK: req.body.TenChuTK,
            SoTK: req.body.SoTK
        }).then((result) => {
            return res.status(200).json({success: true, message: 'Cập nhật thành công'});
        }).catch((error) => {
            console.log(error);
            return res.status(400).json(error);
        })
    }

    async deleteNganHang(req, res) {
        let id_stk = req.params.id;
        await NganHang.findByIdAndDelete(id_stk)
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: "Xoá thành công",
                });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: err.message,
                });
            });
    }
}

module.exports = new NganHangController;