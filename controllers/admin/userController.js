const { response } = require('express')
const user = require('../../models/user')
const details = require('../../models/user')
const {multipleMongooseToObject} =  require('../../util/mongoose')
const {mongooseToObject} =  require('../../util/mongoose')

class userController
{
    async index(req, res, next)
    {
        try{
            const userPerPage = 6;
            var numOfuser;
            
            const search = req.query.search;
            const account = req.query.account;

            if (!req.query.search)
            {
                numOfuser = await (await user.find({}).sort({account: account})).length;
                const numberOfPages = Math.ceil(numOfuser / userPerPage);
                const listNumberPage = [];

                for (var i = 1; i <= numberOfPages; i++)
                {
                    listNumberPage.push({value: i.toString()});
                }
                let page = req.query.page ? Number(req.query.page) : 1;
                var startFrom = (page - 1) * userPerPage;

                await user.find({}).sort({account: account})
                .skip(startFrom)
                .limit(userPerPage)
                .then(user => {
                    res.render('./admin/customer-list', {
                        pre_page: page <= 1 ? null : page - 1,
                        next_page: page >= numberOfPages ? null : page + 1,
                        pages: listNumberPage,
                        user: multipleMongooseToObject(user)
                    })
                })
                .catch(next)
            }
            else
            {
                numOfuser = await (await user.find({account: new RegExp(search, 'i')}).sort({account: account})).length;
                const numberOfPages = Math.ceil(numOfuser / userPerPage);
                const listNumberPage = [];

                for (var i = 1; i <= numberOfPages; i++)
                {
                    listNumberPage.push({value: i.toString()});
                }
                let page = req.query.page ? Number(req.query.page) : 1;
                var startFrom = (page - 1) * userPerPage;

                await user.find({account: new RegExp(search, 'i')}).sort({account: account})
                .skip(startFrom)
                .limit(userPerPage)
                .then(user => {
                    res.render('./admin/customer-list', {
                        pre_page: page <= 1 ? null : page - 1,
                        next_page: page >= numberOfPages ? null : page + 1,
                        pages: listNumberPage,
                        user: multipleMongooseToObject(user)
                    })
                })
                .catch(next)
            }
            }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async detail(reg, res, next)
    {
        try {
            await user.find({slug: reg.params.slug})
            .then(user => 
                res.render('./admin/customer-detail', {
                    user: multipleMongooseToObject(user)
                })
            )
            .catch(next)
        }
        catch(error)
        {
            next(error)
        }
    }

    async uppro(req, res, next)
    {
        try {
            const update = await user.findOneAndUpdate({slug: req.params.slug}, 
                {$set: {account: req.body.account, password: req.body.password, 
                    name: req.body.name, email: req.body.email, phone: req.body.phone,
                    address: req.body.address, slug: req.body.account}}, {returnOriginal: false})
            update.save()
            res.redirect('/admin/user')
        }
        catch(error)
        {
            next(error)
        }
    }
}

module.exports = new userController