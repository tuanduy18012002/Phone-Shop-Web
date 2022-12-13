var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("aaaaaaaaaaaaaaaa");
  res.redirect('/');
});

module.exports = router;