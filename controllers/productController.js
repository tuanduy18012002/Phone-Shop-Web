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
        details.findOne({slug: reg.params.slug})
            .then(details => 
                res.render('./client/product-detail', {
                    details: mongooseToObject(details)
                })
            )
            .catch(next)
    }
}

module.exports = new productController