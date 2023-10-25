const user = require('./User');
const Xe = require('./Xe');
const MaGiaGia = require('./MaGiamGia');
const ThongBao = require('./ThongBao');
const Hoadon_ = require('./Hoadon_');
const FeedBack = require('./FeedBack');
const FavoriteCar = require('./FavoriteCar');

let bodyparser = require('body-parser');

const router = (app) =>{
    app.use(bodyparser.urlencoded({
        extended:true
    }))
     
    app.use('/api/user',user);
    app.use('/api/xe',Xe);
    app.use('/api/voucher',MaGiaGia);
    app.use('/api/thongbao',ThongBao);
    app.use('/api/hoadon',Hoadon_);
    app.use('/api/feedback', FeedBack);
    app.use('/api/favoriteCar', FavoriteCar);
}

module.exports = router;
