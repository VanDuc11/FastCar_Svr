const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaGiaGia = new Schema({
    TieuDe: { type: String },
    MaGiaGia: { type: String },
    GiaTri: { type: Number },
    ThongTin: { type: String },
    HinhAnh: { type: String },
    HSD: { type: Date }
},{timestamps:true});
module.exports = mongoose.model("MaGiamGia",MaGiaGia);