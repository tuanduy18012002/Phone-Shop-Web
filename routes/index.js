const product_router = require('./product');
const site_router = require('./site');
// const detail_router = require('./detail');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

function route(app)
{
    app.use('/product', product_router)
    // app.use('/detail', detail_router)
    app.use('/', site_router)
}

module.exports = route