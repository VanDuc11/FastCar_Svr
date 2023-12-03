const { user } = require('./app/controllers/UserControllers');
const MaGiamGia = require('./app/models/MaGiamGia.model');
const Xe = require('./app/models/Xe.model');
const User = require('./app/models/user.model');
const HoaDon = require('./app/models/HoaDon.model');
const HoaDonController_ = require('./app/controllers/HoaDonController_');
const ThongBao = require('./app/models/ThongBao');
const moment = require('moment');
const admin = require('firebase-admin');

const updateExpiredPromotionalOffers = async () => {
    // Lấy tất cả các ưu đãi

    // Tạo hàm kiểm tra trạng thái của mã giảm giá
    const checkExpiredPromotionalOffers = async () => {
        // Duyệt qua danh sách các mã giảm giá
        const offers = await MaGiamGia.find();
        const Users = await User.find();
        const HoaDons = await HoaDon.find();

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

        for (const hoadon of HoaDons) {
            const user = await User.findOne({ _id: hoadon.User });
            const car = await Xe.findOne({ _id: hoadon.Xe });
            const now = moment();
            const dateFromDB = moment(hoadon.TimeChuXeXN);
            // tính thời gian đã qua
            const duration = moment.duration(now.diff(dateFromDB));
            // nếu còn 15 phút mà user chưa thanh toán -> gửi thông báo

            if (hoadon.TrangThaiHD == 2) {
                if (duration.asSeconds() >= 2700 && duration.asSeconds() < 2703 ) {
                    const title = "Thông báo chuẩn bị huỷ chuyến";
                    const content = "Chuyến xe " + hoadon.MaHD + " sắp hết hạn";
                    sendNotificationToUser(user.TokenFCM, title, content);

                    const noidungNotify = "🚗 Xin chào khách hàng " + user.UserName + ",\n\n" +
                        "Yêu cầu thuê xe " + car.MauXe + "(" + hoadon.MaHD + ")" + " của quý khách sắp hết thời gian thanh toán.\n\n" +
                        "Quý khách vui lòng thanh toán trước 15 phút kể từ khi thông báo này được gửi.\n\n" +
                        "Xin cảm ơn!\n\n" +
                        "FastCar Team 🚘";
                    const thongbao = new ThongBao({
                        HinhAnh: car.HinhAnh[0],
                        TieuDe: "Sắp hết thời gian đặt cọc",
                        NoiDung: noidungNotify,
                        User: user
                    });
                    await thongbao.save();
                } else if (duration.asSeconds() >= 3600 && duration.asSeconds() < 3603) {
                    // huỷ
                    await HoaDon.findOneAndUpdate({ _id: hoadon._id }, {
                        $set: {
                            TrangThaiHD: 0,
                            LyDo: "Chuyến xe đã bị huỷ bởi khách hàng.\nLý do: Hết thời gian thanh toán."
                        }
                    });

                    const title = "Thông báo huỷ chuyến";
                    const content = "Chuyến xe " + hoadon.MaHD + " của bạn đã bị huỷ vì quá hạn đặt cọc";
                    sendNotificationToUser(user.TokenFCM, title, content);

                    const noidungNotify = "🚗 Xin chào khách hàng " + user.UserName + ",\n\n" +
                        "Yêu cầu thuê xe " + car.MauXe + " (" + hoadon.MaHD + ")" + " của quý khách đã tự động huỷ bởi hệ thống do hết thời gian thanh toán.\n\n" +
                        "Quý khách có thể tìm kiếm và đặt cho mình một xe khác.\n\n" +
                        "Rất mong được quý khách tin tưởng sử dụng FastCar. Chúng tôi xin cảm ơn!\n\n" +
                        "🚗 Đội ngũ FastCar 🚘"
                    const thongbao = new ThongBao({
                        HinhAnh: car.HinhAnh[0],
                        TieuDe: "Huỷ đặt xe - Quá hạn đặt cọc",
                        NoiDung: noidungNotify,
                        User: user
                    });
                    await thongbao.save();
                    notificationSent60 = true;
                }
            }

        }
    };

    // Chạy hàm kiểm tra trạng thái của mã giảm giá định kỳ
    setInterval(checkExpiredPromotionalOffers, 5000);
};

async function sendNotificationToUser(tokenFCM, title, body) {

    const message = {
        notification: {
            title: title,
            body: body
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

module.exports = { updateExpiredPromotionalOffers }