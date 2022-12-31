const { request } = require('express')
const product = require('../../models/product')
const user = require('../../models/user')
const {multipleMongooseToObject} =  require('../../util/mongoose')

class adminController
{
    async show(reg, res, next)
    {
        try {
            await product.find({})
            .then(product => 
                res.render('./admin/home', {
                    product: multipleMongooseToObject(product)
                })
            )
            .catch(next)
            res.render('./admin/home')
        }
        catch(error)
        {
            next(error)
        }
    }
}

module.exports = new adminController