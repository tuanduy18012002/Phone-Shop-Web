const express = require('express');
const passport = require('../util/passport')
const router = express.Router()

const site_controller = require('../controllers/siteController')

router.get('/login', site_controller.login)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));
router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
router.get('/register', site_controller.register)
router.post('/register', site_controller.authen_new)
router.use('/', site_controller.show)

module.exports = router