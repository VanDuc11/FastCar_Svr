const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    UserName: { type: String },
    SDT: { type: String },
    NgaySinh: { type: Date },
    GioiTinh: { type: String },
    Email: { type: String },
    UID: { type: String },
    GPLX: {
        HoTen: { type: String },
        SoGPLX: { type: String },
        NgayCap: { type: Date },
        DiaChi: { type: String },
        HinhAnhGPLX: { type: Array },
    },
    CCCD: {
        HoTen: { type: String },
        SoCCCD: { type: String },
        NgayCap: { type: Date },
        DiaChi: { type: String },
        NoiCap: { type: String },
        HinhAnhCCCD: { type: Array },
    }

}, { timestamps: true });

module.exports = mongoose.model('User', User);