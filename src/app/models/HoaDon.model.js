const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HoaDon = new Schema({
    MaHD: { type: String },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Xe: { type: mongoose.Schema.Types.ObjectId, ref: 'Xe' },
    NgayThue: { type: Date },
    NgayTra: { type: Date },
    TongSoNgayThue: { type: Number },
    PhiDV: { type: Number },
    MaGiamGia: { type: String },
    GiamGia: { type: Number },
    PhuPhi: { type: Number },
    TongTien: { type: Number },
    TienCoc: { type: Number },
    TienCocGoc: { type: Number },
    ThanhToan: { type: Number },
    LoiNhan: { type: String },
    GioTaoHD: { type: Date },
    TimeChuXeXN: { type: Date },
    TrangThaiHD: { type: Number },
    HinhAnhChuXeGiaoXe: { type: Array },
    HinhAnhKhachHangTraXe: { type: Array },
    LyDo: { type: String },
    HaveFeedback: { type: Boolean }
}, { timestamps: true }, { forceServerObjectId: true });

module.exports = mongoose.model("HoaDon", HoaDon);