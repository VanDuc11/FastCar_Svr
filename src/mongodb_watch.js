

const { user } = require('./app/controllers/UserControllers');
const MaGiamGia = require('./app/models/MaGiamGia.model');
const Xe = require('./app/models/Xe.model');
const User = require('./app/models/user.model');
const updateExpiredPromotionalOffers = async () => {
    // Lấy tất cả các ưu đãi

    // Tạo hàm kiểm tra trạng thái của mã giảm giá
    const checkExpiredPromotionalOffers = async () => {
        // Duyệt qua danh sách các mã giảm giá
        const offers = await MaGiamGia.find();
        const Users = await User.find();

        for (const offer of offers) {
            // Kiểm tra xem ưu đãi đã hết hạn chưa
            const now = new Date();
            if (offer.TrangThai === true && offer.HSD < now) {
                // Cập nhật trạng thái của ưu đãi thành false
                await MaGiamGia.findOneAndUpdate({ _id: offer._id }, {
                    $set: {
                        TrangThai: false,
                    },
                });
            }
        }
        for (const u of Users) {
            const xes = await Xe.find({ ChuSH: u._id });
            if (xes.length > 0) {
                // Sửa trạng thái đăng thành true
                if (u.DangXe == false) {
                    await User.updateOne({ _id: u._id }, {
                        $set: {
                          DangXe: true,
                        },
                      });
                }
                
            }
        }
    };

    // Chạy hàm kiểm tra trạng thái của mã giảm giá định kỳ
    setInterval(checkExpiredPromotionalOffers, 5000);
};


module.exports = { updateExpiredPromotionalOffers }