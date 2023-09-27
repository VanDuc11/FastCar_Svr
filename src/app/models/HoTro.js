const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HoTro = new Schema({
    TenCty:{typr:String},
    SDT:{typr:String},
    Facebook:{typr:String},
    DiaChi:{typr:String},
},{timestamps:true})
module.exports = mongoose.model("HoTro",HoTro);