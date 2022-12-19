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

    app.post('/product', async (req, res, next) => {
        try{
            await product.find({brand: req.body.brand})
            .then(product => {
                res.render('./client/product', {
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