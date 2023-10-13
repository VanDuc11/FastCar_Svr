const mongoose = require('mongoose');
const { type } = require('mquery/lib/env');
const Schema = mongoose.Schema;

const MaGiaGia = new Schema({
    TieuDe: { type: String },
    MaGiaGia: { type: String },
    Code: { type: String },
    GiaTri: { type: Number },
    ThongTin: { type: String },
    HinhAnh: { type: String },
    HSD: { type: Date },
    TrangThai:{type: Boolean}
}, { timestamps: true });
module.exports = mongoose.model("MaGiamGia", MaGiaGia);