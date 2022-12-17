const product = require('../models/product')
const {multipleMongooseToObject} =  require('../util/mongoose')

class siteController
{
    log(reg, res)
    {
        res.render('./client/login')
    }

    show(reg, res, next)
    {
        product.find({})
            .then(product => {
                res.render('./client/home', {
                    product: multipleMongooseToObject(product)
                })
            })
            .catch(next)
    }
}

module.exports = new siteController