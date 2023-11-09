const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LichSuGiaoDich = new Schema({
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    SoTienGD: { type: Number },
    ThoiGian: { type: Date },
    NoiDung: { type: String },
    TrangThai: { type: Number },
    HoaDon: { type: mongoose.Schema.Types.ObjectId, ref: 'HoaDon' }
}, { collection: 'lichsugiaodich' }, { timestamps: true });
module.exports = mongoose.model('LichSuGiaoDich', LichSuGiaoDich);