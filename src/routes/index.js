const user = require('./User');
const Xe = require('./Xe');
const MaGiaGia = require('./MaGiamGia');
const ThongBao = require('./ThongBao');
let bodyparser = require('body-parser');

const router = (app) =>{
    app.use(bodyparser.urlencoded({
        extended:true
    }))
     
    app.use('/user',user);
    app.use('/quanlyxe',Xe);
    app.use('/quanlyvoucher',MaGiaGia);
    app.use('/thongbao',ThongBao);

}

module.exports = router;
