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
            const numOfProduct = await (await product.find({})).length;
            const numberOfPages = Math.ceil(numOfProduct / productPerPage);
            const listNumberPage = [];
            for (var i = 1; i <= numberOfPages; i++)
            {
                listNumberPage.push({value: i.toString()});
            }
            let page = req.query.page ? Number(req.query.page) : 1;
            // if (page > numberOfPages)
            // {
            //     res.redirect('/product/?page=' + encodeURIComponent(numberOfPages));
            // }
            // else if (page < 1)
            // {
            //     res.redirect('/product/?page=' + encodeURIComponent('1'));
            // }
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
        catch(error){
            res.status(500).json({message: error.message})
        }
    })

    app.post('/product', async (req, res, next) => {
        try{
            const productPerPage = 6;
            const numOfProduct = await (await product.find({brand: req.body.brand})).length;
            console.log(numOfProduct);
            const numberOfPages = Math.ceil(numOfProduct / productPerPage);
            const listNumberPage = [];
            for (var i = 1; i <= numberOfPages; i++)
            {
                listNumberPage.push({value: i.toString()});
            }
            let page = req.query.page ? Number(req.query.page) : 1;
            // if (page > numberOfPages)
            // {
            //     res.redirect('/product/?page=' + encodeURIComponent(numberOfPages));
            // }
            // else if (page < 1)
            // {
            //     res.redirect('/product/?page=' + encodeURIComponent('1'));
            // }
            var startFrom = (page - 1) * productPerPage;


            await product.find({brand: req.body.brand})
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
        catch(error){
            res.status(500).json({message: error.message})
        }
    })

    app.use('/product', product_router)
    app.use('/', site_router)
}

module.exports = route