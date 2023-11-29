const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    UserName: { type: String },
    SDT: { type: String },
    NgaySinh: { type: String },
    GioiTinh: { type: String },
    Email: { type: String },
    UID: { type: String },
    HoTen_GPLX: { type: String },
    So_GPLX: { type: String },
    NgayCap_GPLX: { type: String },
    DiaChi_GPLX: { type: String },
    HinhAnh_GPLX: { type: Array },
    TrangThai_GPLX: { type: Number},
    So_CCCD: { type: String },
    NgayCap_CCCD: { type: String },
    NoiCap_CCCD: { type: String },
    MatKhau: { type: String },
    Avatar: { type: String },
    NgayThamGia: { type: Date },
    SoDu: { type: Number},
    TokenFCM: { type: String},
    DangXe: {type: Boolean}
}, { timestamps: true });
module.exports = mongoose.model('User', User);