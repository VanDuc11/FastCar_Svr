const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HoaDon = new Schema({
    MaHD: { type: String },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    Xe: { type: mongoose.Schema.Types.ObjectId, ref: 'Xe'},
    NgayThue: { type: String },
    NgayTra: { type: String },
    TongSoNgayThue: { type: Number },
    PhiDV: { type: Number },
    MaGiamGia: { type: String },
    GiamGia: { type: Number },
    PhuPhi: { type: Number },
    TongTien: { type: Number },
    TienCoc: { type: Number },
    ThanhToan: { type: Number },
    GioTaoHD: { type: Date },
    TrangThaiHD: { type: Number},
}, { timestamps: true });

module.exports = mongoose.model("HoaDon", HoaDon);