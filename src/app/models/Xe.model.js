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
    DangKyXe: { type: String},
    DangKiem: { type: String},
    BaoHiem: { type: String},
    DiaChiXe: { type: String },
    Latitude: { type: String },
    Longitude: { type: String },
    GiaThue1Ngay: { type: Number },
    ChuSH: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    TrangThai: { type: Number },
    SoChuyen: { type: Number },
    TrungBinhSao: {type: Number}
}, { timestamps: true });


module.exports = mongoose.model("Xe", Xe);