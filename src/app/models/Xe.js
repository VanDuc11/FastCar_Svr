const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Xe = new Schema({
    BKS: { type: String },
    HangXe: { type: String },
    MauXe: { type: String },
    NSX: { type: String },
    ChuSH: {
        HoTen: String,
        NgaySinh: Date,
        DiaChi: String
    },
    ChuyenDong: { type: String },
    LoaiNhienLieu: { type: String },
    MoTa: { type: String },
    TinhNang: { type: [String] },
    HinhAnh: { type: [String] },
    FeedBack: [
        {
            UserName: { type: String },
            NoiDung: { type: String },
            Sao: { type: Number },
        }
    ],
    TrangThai: { type: Boolean }
},{timestamps: true});
module.exports = mongoose.model("Xe",Xe);