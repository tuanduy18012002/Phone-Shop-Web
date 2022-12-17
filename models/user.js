const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    admin: String,
    account: String,
    password: String,
    email: String,
    phone: String,
    address: String,
});

module.exports = mongoose.model('user', user);