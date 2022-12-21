const product_router = require('./product');
const site_router = require('./site');
const user = require('../models/user')
const product = require('../models/product');
const {multipleMongooseToObject} =  require('../util/mongoose');

function route(app)
{
    app.get('/register', (req, res) => {
        res.render('./client/register.handlebars')
    })
    
    app.post('/register', async (req, res) => {
        try{
            const data = await user.find({account: req.body.account});
            // res.json(data);
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
    })
    
    app.get('/login', (req, res) => {
        res.render('./client/login.handlebars')
    })
    
    app.post('/login', async (req, res) => {
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
    })
     
    app.get("/profile", (req, res) => {
        const sessionuser = req.session.user;
        res.send(sessionuser);
    });

    app.get('/product', async (req, res, next) =>{
        try{
            const productPerPage = 6;
            var numOfProduct;
            
            const search = req.query.search;
            const brand = req.query.brand;

            if (!req.query.search && !req.query.brand)
            {
                numOfProduct = await (await product.find({})).length;
                const numberOfPages = Math.ceil(numOfProduct / productPerPage);
                const listNumberPage = [];

                for (var i = 1; i <= numberOfPages; i++)
                {
                    listNumberPage.push({value: i.toString()});
                }
                let page = req.query.page ? Number(req.query.page) : 1;
                var startFrom = (page - 1) * productPerPage;

                await product.find({})
                .skip(startFrom)
                .limit(productPerPage)
                .then(product => {
                    console.log(product.length);
                    res.render('./client/product', {
                        pre_page: page <= 1 ? null : page - 1,
                        next_page: page >= numberOfPages ? null : page + 1,
                        pages: listNumberPage,
                        product: multipleMongooseToObject(product)
                    })
                })
                .catch(next)
            }
            else
            {
                numOfProduct = await (await product.find({brand: req.query.brand})).length;
                const numberOfPages = Math.ceil(numOfProduct / productPerPage);
                const listNumberPage = [];

                for (var i = 1; i <= numberOfPages; i++)
                {
                    listNumberPage.push({value: i.toString()});
                }
                let page = req.query.page ? Number(req.query.page) : 1;
                var startFrom = (page - 1) * productPerPage;

                await product.find({name: new RegExp(search, 'i') ,brand: brand})
                .skip(startFrom)
                .limit(productPerPage)
                .then(product => {
                    console.log(product.length);
                    res.render('./client/product', {
                        pre_page: page <= 1 ? null : page - 1,
                        next_page: page >= numberOfPages ? null : page + 1,
                        pages: listNumberPage,
                        product: multipleMongooseToObject(product)
                    })
                })
                .catch(next)
            }
            }
        catch(error){
            res.status(500).json({message: error.message})
        }
    })

    app.use('/product', product_router)
    app.use('/', site_router)
}

module.exports = route