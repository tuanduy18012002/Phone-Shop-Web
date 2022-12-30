const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    name: String,
    desscription: String,
    image: String,
    brand: String,
    slug: String,
    price: Number,
});

module.exports = mongoose.model('product', product);