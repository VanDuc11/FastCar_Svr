const favoriteCar = require('../models/FavoriteCar.model');
const Xe = require('../models/Xe.model');

class favoriteCarController {
    async getfavoriteCar(req, res) {
        try {
            const userId = req.params.userId;

            const favoriteCars = await favoriteCar.find({ User: userId });

            const carIds = favoriteCars.map(favoriteCar => favoriteCar.Xe);

            let query = { _id: { $in: carIds }};

            const cars = await Xe.find(query).populate({ path: 'ChuSH', model: 'User' }).sort({_id: -1});
            res.status(200).json(cars);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách xe yêu thích theo userId:', error);
            res.status(500).json({ error: 'Lỗi khi lấy danh sách xe yêu thích theo userId' });
        }

    }
    
    async findFavoriteCar(req, res) {
        try {
            const userId = req.params.userId;
            const carId = req.params.carId;

            const favoriteCars = await favoriteCar.find({ User: userId, Xe: carId });

            const carIds = favoriteCars.map(favoriteCar => favoriteCar.Xe);

            let query = { _id: { $in: carIds } };

            const cars = await Xe.find(query).populate({ path: 'ChuSH', model: 'User' });
            res.status(200).json(cars);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách xe yêu thích theo userId:', error);
            res.status(500).json({ error: 'Lỗi khi lấy danh sách xe yêu thích theo userId' });
        }

    }

    async createfavoriteCar(req, res) {
        try {
            const model = new favoriteCar(req.body);
            await model.save();
            return res.status(201).send({ message: 'Yêu cầu tạo mới thành công' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    async deleteFavoriteCar(req, res) {
        try {
            const userId = req.params.userId;
            const carId = req.params.carId;

            const favorite = await favoriteCar.findOne({ Xe: carId, User: userId });
            if (!favorite) {
                return res.status(404).json({ error: 'Không tìm thấy xe yêu thích hoặc không có quyền xóa' });
            }

            await favoriteCar.deleteOne({ Xe: carId });
            res.status(200).json("Xoá thành công");
        } catch (error) {
            console.error('Lỗi khi xóa mục ưa thích:', error);
            res.status(500).json({ error: 'Lỗi khi xóa mục ưa thích' });
        }
    }
}

module.exports = new favoriteCarController;