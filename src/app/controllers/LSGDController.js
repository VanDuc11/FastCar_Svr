const lsgd = require('../models/LichSuGiaoDich.model');

class LSGDController {
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