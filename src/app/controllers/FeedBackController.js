const feedback = require('../models/FeedBack.model');

class FeedBackController {
    async getFeedBack(req, res, next) {
        const check = {};
        if (typeof (req.query.Xe) != 'undefined') {
            const xeArray = req.query.Xe.split(',');
            check.Xe = xeArray;
        }

        if (typeof (req.query.User) != 'undefined') {
            check.User = req.query.User;
        }

        await feedback.find(check)
        .populate({
            path: 'Xe',
            populate: { path: 'ChuSH', select: '_id UserName Email UID SDT Avatar NgayThamGia', model: 'User' }
        }).populate('User', ('_id UserName Email UID SDT Avatar NgayThamGia')).sort({ _id: -1 })
            .then((result) => {
                res.status(200).json(result);
            });

    }
    
    async createFeedBack(req, res, next) {
        try {
            const model = new feedback({
                User: req.body.User,
                Xe: req.body.Xe,
                NoiDung: req.body.NoiDung,
                SoSao: req.body.SoSao,
                ThoiGian: new Date()
            });
            await model.save();
            return res.status(201).send({ model, message: 'Yêu cầu tạo mới thành công' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

module.exports = new FeedBackController;