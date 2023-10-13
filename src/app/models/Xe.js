const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Xe = new Schema({
    BKS: { type: String },
    HangXe: { type: String },
    MauXe: { type: String },
    NSX: { type: String },
    SoGhe: { type: String },
    ChuyenDong: { type: String },
    LoaiNhienLieu: { type: String },
    TieuHao: { type: String },
    MoTa: { type: String },
    HinhAnh: { type: Array },
    FeedBack: [
        {
            UserName: { type: String },
            NoiDung: { type: String },
            Sao: { type: Number },
        }
    ],
    TrangThai: { type: Number },
    SoChuyen: { type: String }
}, { timestamps: true });
module.exports = mongoose.model("Xe", Xe);