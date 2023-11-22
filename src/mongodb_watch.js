 
const MaGiamGia = require('./app/models/MaGiamGia.model');
const updateExpiredPromotionalOffers = async () => {
    // Lấy tất cả các ưu đãi
    const offers = await MaGiamGia.find();
  
    // Tạo hàm kiểm tra trạng thái của mã giảm giá
    const checkExpiredPromotionalOffers = async () => {
    
      for (const offer of offers) {
        // Kiểm tra xem ưu đãi đã hết hạn chưa
        const now = new Date();
        if (offer.HSD < now) {
          // Cập nhật trạng thái của ưu đãi thành false
          await MaGiamGia.updateOne({ _id: offer._id }, {
            $set: {
              TrangThai: false,
            },
          });
        }else{
            return offer.TrangThai;
        }
      }
    };
  
    // Chạy hàm kiểm tra trạng thái của mã giảm giá định kỳ
    setInterval(checkExpiredPromotionalOffers, 1000);
  };
  

module.exports = { updateExpiredPromotionalOffers }