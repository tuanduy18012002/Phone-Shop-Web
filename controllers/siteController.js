const product = require('../models/product')
const {multipleMongooseToObject} =  require('../util/mongoose')

class siteController
{
    // show(reg, res)
    // {
    //     res.render('./client/home')
    // }
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