const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteCar = new Schema({
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Xe: { type: mongoose.Schema.Types.ObjectId, ref: 'Xe'}
},{collection: 'favoriteCar'})

module.exports = mongoose.model("FavoriteCar", FavoriteCar);