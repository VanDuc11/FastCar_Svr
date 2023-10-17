const user = require('./User');
const Xe = require('./Xe');
const MaGiaGia = require('./MaGiamGia');
const ThongBao = require('./ThongBao');
const Hoadon_ = require('./Hoadon_');

let bodyparser = require('body-parser');

const router = (app) =>{
    app.use(bodyparser.urlencoded({
        extended:true
    }))
     
    app.use('/user',user);
    app.use('/quanlyxe',Xe);
    app.use('/quanlyvoucher',MaGiaGia);
    app.use('/thongbao',ThongBao);
    app.use('/quanlyhoadon',Hoadon_);

}

module.exports = router;
