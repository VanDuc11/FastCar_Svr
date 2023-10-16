const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Xe = new Schema({
    BKS: { type: String },
    HangXe: { type: String },
    MauXe: { type: String },
    NSX: { type: String },
    SoGhe: { type: Number },
    ChuyenDong: { type: String },
    LoaiNhienLieu: { type: String },
    TieuHao: { type: Number },
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
    SoChuyen: { type: Number }
}, { timestamps: true });
module.exports = mongoose.model("Xe", Xe);