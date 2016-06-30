var express = require('express');
var router = express.Router();
var db = require('../db/api');
var auth = require('../auth');

/* GET home page. */
router.get('/signup', auth.isLoggedIn, function(req, res, next) {
  res.render('auth/signup', { title: 'Sign Up', id: req.session.userId});
});

router.get('/logout', function(req, res, next){
    req.session = null;
  res.redirect('/')
});

router.post('/signup', auth.isLoggedIn, function(req, res, next) {
  db.findUserByUsername(req.body.username).then(function (user) {
      if(user) {
          res.render('auth/signup', {error: "user already exists"})
      } else {
          auth.createUser(req.body).then(function (id) {
              req.session.userId = id
              res.redirect('/clients')
          })
      }
  })
});
router.post('/', function(req, res, next) {
  auth.passport.authenticate('local', function(err, user, info) {
            if(err) {
                res.render('index', {error: err})
            } else if (user) {
                req.session.userId = user.id;
                res.redirect('clients/client');
            }
    })(req, res, next);
});

module.exports = router;
