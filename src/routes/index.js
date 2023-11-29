const user = require('./User');
const Xe = require('./Xe');
const MaGiaGia = require('./MaGiamGia');
const ThongBao = require('./ThongBao');
const Hoadon_ = require('./Hoadon_');
const FeedBack = require('./FeedBack');
const FavoriteCar = require('./FavoriteCar');
const LSGD = require('./LSGD');
const NganHangg = require('./NganHang');
const ThongKe = require('./ThongKe');
const Home = require('./Home');
const loginRouter = require('./login');
let bodyparser = require('body-parser');

const router = (app) =>{
    app.use(bodyparser.urlencoded({
        extended:true
    }))

    app.use('/',loginRouter);
    app.use('/home', Home);  
    app.use('/quanlyxe', Xe);
    app.use('/chuyenxe',Hoadon_);
    app.use('/thongbao', ThongBao);
    app.use('/khuyenmai',MaGiaGia);
    app.use('/thongke', ThongKe);
    app.use('/thanhtoan', LSGD);
    app.use('/khachhang', user);
 

    app.use('/api/user',user);
    app.use('/api/xe',Xe);
    app.use('/api/voucher',MaGiaGia);
    app.use('/api/thongbao',ThongBao);
    app.use('/api/hoadon',Hoadon_);
    app.use('/api/feedback', FeedBack);
    app.use('/api/favoriteCar', FavoriteCar);
    app.use('/api/lsgd', LSGD);
    app.use('/api/nganhang', NganHangg);
}

module.exports = router;
