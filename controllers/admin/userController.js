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
            // const brand = req.query.brand;
            // const price = req.query.price;
            const account = req.query.account;

            if (!req.query.search && !req.query.brand)
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
            // else
            // {
            //     numOfuser = await (await user.find({name: new RegExp(search, 'i'), brand: new RegExp(brand, 'i')}).sort({price: price})).length;
            //     const numberOfPages = Math.ceil(numOfuser / userPerPage);
            //     const listNumberPage = [];

            //     for (var i = 1; i <= numberOfPages; i++)
            //     {
            //         listNumberPage.push({value: i.toString()});
            //     }
            //     let page = req.query.page ? Number(req.query.page) : 1;
            //     var startFrom = (page - 1) * userPerPage;

            //     await user.find({name: new RegExp(search, 'i') , brand: new RegExp(brand, 'i')}).sort({price: price})
            //     .skip(startFrom)
            //     .limit(userPerPage)
            //     .then(user => {
            //         res.render('./admin/customer-list', {
            //             pre_page: page <= 1 ? null : page - 1,
            //             next_page: page >= numberOfPages ? null : page + 1,
            //             pages: listNumberPage,
            //             user: multipleMongooseToObject(user)
            //         })
            //     })
            //     .catch(next)
            // }
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

    // async uppro(reg, req, res, next)
    // {
    //     try {
    //         const update = await user.findOneAndUpdate({slug: reg.params.slug}, 
    //             {$set: {name: req.body.name, description: req.body.description, 
    //                 brand: req.body.brand, price: req.body.price, image: req.body.image}}, {returnOriginal: false})
    //         update.save()
    //     }
    //     catch(error)
    //     {
    //         next(error)
    //     }
    // }
}

module.exports = new userController