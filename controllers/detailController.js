const product = require('../models/product')
const {mongooseToObject} =  require('../util/mongoose')

class detailController
{
    show(reg, res, next)
    {
        product.findOne({slug: reg.params.slug})
            .then(product => 
                res.render('./client/product-detail', {
                    product: mongooseToObject(product)
                })
            )
            .catch(next)
    }
}

module.exports = new detailController