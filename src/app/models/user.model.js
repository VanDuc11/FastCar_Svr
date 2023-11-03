const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    UserName: { type: String },
    SDT: { type: String },
    NgaySinh: { type: Date },
    GioiTinh: { type: String },
    Email: { type: String },
    UID: { type: String },
    GPLX: { type: Array },
    CCCD: {type: Array },
    HoTen_GPLX: { type: String },
    So_GPLX: { type: String },
    NgayCap_GPLX: { type: Date },
    DiaChi_GPLX: { type: String },
    HinhAnh_GPLX: { type: Array },
    MatKhau: { type: String },
    Avatar: { type: String },
    NgayThamGia: { type: Date }
}, { timestamps: true });
module.exports = mongoose.model('User', User);