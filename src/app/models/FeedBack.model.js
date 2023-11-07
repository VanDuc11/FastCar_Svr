const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedBack = new Schema({
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Xe: { type: mongoose.Schema.Types.ObjectId, ref: 'Xe' },
    NoiDung: { type: String},
    SoSao: { type: Number},
    ThoiGian: { type: Date }
},{collection: 'feedback'}, { timestamps: true })

module.exports = mongoose.model("FeedBack", FeedBack);