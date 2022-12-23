const product = require('../models/product')
const user = require('../models/user')
const {multipleMongooseToObject} =  require('../util/mongoose')

class siteController
{
    login(reg, res)
    {
        res.render('./client/login')
    }

    async authen(req, res, next)
    {
        try{
            const data = await user.find({account: req.body.account, password: req.body.password});
            if (data.length > 0)
            {
                req.session.user = data
                req.session.save()
                const sessionuser = req.session.user;
                res.send("you have login success");
            }
            else
            {
                res.send('no account available')
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
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
                const account = new user(formData);
                account.save();
            }
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
        res.redirect('/');
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