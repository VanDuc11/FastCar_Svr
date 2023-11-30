const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThongBao = new Schema({
    TieuDe: { type: String },
    MaGiamGia: { type: String },
    GiaTri: { type: Number },
    GiaTriMax: { type: Number },
    NoiDung: { type: String },
    HinhAnh: { type: String},
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })
module.exports = mongoose.model("ThongBao", ThongBao);