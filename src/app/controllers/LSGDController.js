const lsgd = require('../models/LichSuGiaoDich.model');
const User = require('../models/user.model');
const NganHang = require('../models/NganHang.model');

class LSGDController {
    async index(req, res) {
        let check = null;
        if (typeof (req.query.TrangThai) != 'undefined') {
            check = { TrangThai: req.query.TrangThai.split(',')};
        }
        if (req.query.start_date != undefined && req.query.end_date) {
            check = {
                "ThoiGian": {
                    $gte: new Date(req.query.start_date),
                    $lte: new Date(req.query.end_date),
                }
            };
        }
        await lsgd.find(check).populate({ path: 'User', model: 'User' }).sort({_id: -1})
        .then((result) => {
            console.log(result);
            res.status(200).render('ThanhToan',{
                data:  result.map(res => res.toJSON())
            })
        });
    }
    
   
    async chitietthanhtoan(req, res) {
        await lsgd.find({ _id: req.params.id }).populate({ path: 'User', model: 'User' }).sort({ _id: -1 })
            .then((result) => {
                console.log(result);

                res.status(200).render('ChiTietThanhToan', {
                    data: result.map(res => res.toJSON())
                })
            })
            
    }
   
 

    async Lichsugiaodich(req, res) {
        await lsgd.find({ TrangThai :1})
            .populate({ path: "User", model: "User" })
            .sort({ _id: -1 })
            .then((result) => {

                res.status(200).render("Lichsugiaodich", {
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
    async duyetthanhtoan(req, res) {
        const id = req.params.id;
        await lsgd.updateOne({ _id: id },
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
    async findthanhtoan(req, res) {
        let check = null;
        if (typeof (req.query.TrangThai) != 'undefined') {
            check = { TrangThai: req.query.TrangThai.split(',')};
        }
        if (req.query.start_date != undefined && req.query.end_date) {
            check = {
                "ThoiGian": {
                    $gte: new Date(req.query.start_date),
                    $lte: new Date(req.query.end_date),
                }
            };
        }

        await lsgd.find(check).sort({ _id: -1 })
            .then((result) => {
                res.status(200).json(result);
            });
              
    }
    

    async find_id(req,res){
        await lsgd.findById(req.params.id).populate({ path: 'User', model: 'User' }).sort({ _id: -1 })
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
    async getLSGD(req, res, next) {
        let check = null;
        if (typeof (req.query.User) != 'undefined') {
            check = { User: req.query.User };
        }

        await lsgd.find(check).populate('User', ('_id UserName Email UID SDT Avatar')).sort({ _id: -1 })
            .then((result) => {
                res.status(200).json(result);
            });

    }
    
    async createLSGD(req, res, next) {
        try {
            const model = new lsgd(req.body);
            await model.save();
            return res.status(201).send({ success: true, message: 'Yêu cầu tạo mới thành công' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
   
}

module.exports = new LSGDController;