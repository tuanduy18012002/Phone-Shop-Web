const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const user = new Schema({
    admin: String,
    account: String,
    password: String,
    email: String,
    phone: String,
    address: String,
    name: String,
    admin: Boolean,
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', user);