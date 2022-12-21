const { response } = require('express')
const product = require('../models/product')
const details = require('../models/product')
const {multipleMongooseToObject} =  require('../util/mongoose')
const {mongooseToObject} =  require('../util/mongoose')

class productController
{
    index(reg, res, next)
    {
        product.find({})
        .then(product => {
            res.render('./client/product', {
                product: multipleMongooseToObject(product)
            })
        })
        .catch(next)
    }

    show(reg, res, next)
    {
        product.find({slug: reg.params.slug})
        .then(product => 
            res.render('./client/product-detail', {
                product: mongooseToObject(product)
            })
        )
        .catch(next)
    }
}

module.exports = new productController