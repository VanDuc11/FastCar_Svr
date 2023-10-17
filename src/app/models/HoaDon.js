const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HoaDon = new Schema({
    MaHD: { type: String },
    User: {
        UserName: { type: String },
        Email: { type: String },
        UID: { type: String },
        HoTen: { type: String },
        SoCCCD: { type: String },
        SDT: { type: String },
    },
    Xe: {
        BKS: { type: String },
        HangXe: { type: String },
        MauXe: { type: String },
        ChuSH: { type: String },
        SoGhe: { type: Number },
        HinhAnh: { type: Array },
        Gia: { type: Number }
    },
    NgayThue: { type: Date },
    NgayTra: { type: Date },
    TongTien: { type: String },
    PhiDV: { type: String },
    MaGiamGia: { type: String },
    GiamGia: { type: Number },
    TienCoc: { type: Number },
    PhuPhi: { type: Number },
    ThanhToan: { type: Number },
    TrangThaiDH: { type: Number},
    TinVat: {
        Loai: { type: String },
        HinhAnh: { type: [String] },
        TrangThai: { type: Number }
    }

}, { timestamps: true });

module.exports = mongoose.model("HoaDon", HoaDon);