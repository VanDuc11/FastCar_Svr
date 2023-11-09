const feedback = require('../models/FeedBack.model');

class FeedBackController {
    async getFeedBack(req, res, next) {
        let check = null;
        if (typeof (req.query.Xe) != 'undefined') {
            check = { Xe: req.query.Xe };
        }

        if (typeof (req.query.User) != 'undefined') {
            check = { User: req.query.User };
        }

        await feedback.find(check).populate('Xe')
        .populate({
            path: 'Xe',
            populate: { path: 'ChuSH', model: 'User' }
        }).populate('User').sort({ _id: -1 })
            .then((result) => {
                res.status(200).json(result);
            });

    }
    
    async createFeedBack(req, res, next) {
        try {
            const model = new feedback(req.body);
            await model.save();
            return res.status(201).send({ model, message: 'Yêu cầu tạo mới thành công' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

module.exports = new FeedBackController;