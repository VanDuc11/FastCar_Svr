const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LichSuGiaoDich = new Schema({
    MaLSGD: { type: String },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title:{type: Number},
    SoTienGD: { type: Number },
    ThoiGian: { type: Date },
    NoiDung: { type: String },
    TrangThai: { type: Number },
    HoaDon: { type: mongoose.Schema.Types.ObjectId, ref: 'HoaDon' },
    NganHang: { type: mongoose.Schema.Types.ObjectId, ref: 'NganHang' },
    HinhAnh: { type: String }
}, { collection: 'lichsugiaodich' }, { timestamps: true });
module.exports = mongoose.model('LichSuGiaoDich', LichSuGiaoDich);