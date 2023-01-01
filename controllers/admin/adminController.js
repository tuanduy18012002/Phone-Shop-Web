const { request } = require('express')
const product = require('../../models/product')
const user = require('../../models/user')
const passport = require('../../util/passport')
const {multipleMongooseToObject} =  require('../../util/mongoose')

class adminController
{
    show(req, res, next)
    {
        if (req.user == null)
        {
            res.redirect('/')
        }
        const temp = req.user[0]
        const ad = JSON.parse(JSON.stringify(temp))
        if (ad.admin)
        {
            res.render('./admin/home')
        }
        else
        {
            res.redirect('/')
        }
    }
}

module.exports = new adminController