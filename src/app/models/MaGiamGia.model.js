const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaGiaGia = new Schema({
    TieuDe: { type: String },
    MaGiamGia: { type: String },
    Code: { type: String },
    GiaTri: { type: Number },
    GiaTriMax: { type: Number},
    NoiDung: { type: String },
    HinhAnh: { type: String },
    NgayBD: { type: Date},
    HSD: { type: Date },
    TrangThai:{ type: Boolean}
}, { timestamps: true });
module.exports = mongoose.model("MaGiamGia", MaGiaGia);