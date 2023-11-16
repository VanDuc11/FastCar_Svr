const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NganHang = new Schema({
    TenNH: { type: String },
    TenChuTK: { type: String },
    SoTK: { type: String },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {collection: 'nganhang'});


module.exports = mongoose.model("NganHang", NganHang);