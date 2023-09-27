const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThongBao = new Schema({
    TieuDe:{type:String},
    MaGiamGia:{type:String},
    GiaTri:{type:Number},
    ThongTin:{type:String},
    ThongTinCT:{type:String},
    HinhAnh:{type:String},
},{timestamps:true})
module.exports = mongoose.model("ThongBao",ThongBao);