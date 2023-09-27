const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    UserName: { type: String },
    SDT: { type: String },
    NgaySinh: { type: String },
    GioiTinh: { type: String },
    Email: { type: String },
    UID: { type: String },
    GPLX: {
        HoTen: { type: String },
        SoGPLX: { type: String },
        NgayCap: { type: Date },
        DiaChi: { type: String },
        HinhAnhGPLX: { type: [String] },
    },
    CCCD: {
        HoTen: { type: String },
        SoCCCD: { type: String },
        NgaySinh: { type: Date },
        NgayCap: { type: Date },
        DiaChi: { type: String },
        HinhAnhCCCD: { type: [String] },
    },
    NgayThamGia: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', User);