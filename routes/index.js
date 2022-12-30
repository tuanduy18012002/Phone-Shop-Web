const product_router = require('./product');
const site_router = require('./site');
const user = require('../models/user')
const passport = require('passport')
const product = require('../models/product');
const {multipleMongooseToObject} =  require('../util/mongoose');

function route(app)
{    
    app.use('/product', product_router)
    app.use('/', site_router)
}

module.exports = route