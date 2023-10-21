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
    MatKhau: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', User);