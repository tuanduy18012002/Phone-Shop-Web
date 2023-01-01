const { request } = require('express')
const product = require('../models/product')
const user = require('../models/user')
const {multipleMongooseToObject} =  require('../util/mongoose')

class siteController
{
    pro(req, res, next)
    {
        const data = req.user
        res.render('./client/profile', {showPro : data})
    }

    async uppro(req, res, next)
    {
        try {
            console.log(req.body.name)
            const update = await user.findOneAndUpdate({account: req.body.account}, 
                {$set: {email: req.body.email, address: req.body.address, 
                    phone: req.body.phone, name: req.body.name}}, {returnOriginal: false})
            update.save()
            res.redirect('/')
        }
        catch(error)
        {
            next(error)
        }
    }

    login(req, res, next)
    {
        res.render('./client/login')
    }

    register(reg, res)
    {
        res.render('./client/register')
    }

    async authen_new(req, res) 
    {
        try{
            const data = await user.find({account: req.body.account});
            if (data.length > 0)
            {
                res.status(500).json({message: 'Username has been existed!'});
            }
            else
            {
                const formData = req.body;
                formData.slug = req.body.account;
                const account = new user(formData);
                account.save();
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
        res.redirect('/login');
    }
    
    async show(reg, res, next)
    {
        try {
            await product.find({})
            .then(product => 
                res.render('./client/home', {
                    product: multipleMongooseToObject(product)
                })
            )
            .catch(next)
        }
        catch(error)
        {
            next(error)
        }
    }
}

module.exports = new siteController