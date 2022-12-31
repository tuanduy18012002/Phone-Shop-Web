var express = require('express');
var router = express.Router();
var product_router = require('./product')
var adminController = require('../../controllers/admin/adminController');

router.use('/', function (req, res, next) {
  req.app.locals.layout = 'admin'; // set your layout here
  next(); // pass control to the next handler
  });
router.use('/product', product_router)
router.use('/', adminController.show)

module.exports = router;