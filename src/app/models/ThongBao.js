const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThongBao = new Schema({
    TieuDe: { type: String },
    MaGiamGia: { type: String },
    GiaTri: { type: Number },
    GiaTriMax: { type: Number },
    NoiDung: { type: String },
    HinhAnh: { type: String },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Xe: { type: mongoose.Schema.Types.ObjectId, ref: 'Xe' },
    HoaDon: { type: mongoose.Schema.Types.ObjectId, ref: 'HoaDon' },
    Type: { type: Number }
}, { timestamps: true })
module.exports = mongoose.model("ThongBao", ThongBao);