var express = require('express');
var router = express.Router();
var db = require('../db/knex');
var auth = require('../auth');

/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/logout', function(req, res, next){
    req.session = null;
  res.redirect('/')
});
router.get('/login', function(req, res, next) {

  if(req.session.userID) {
    res.redirect('/client/:id');
  } else {
    next();
  }
}, function(req, res, next){
    res.render('/login')
}
  res.render('login', { title: 'Express' });
});
router.post('/signup', function(req, res, next) {
  db.findUserByUsername(req.body.username).then(function (user) {
      if(user) {
          res.render('signup', {error: "user already exists"})
      } else {
          auth.createUser(req.body).then(function (id) {
              req.session.userId = id
              res.redirect('/client/' + req.session.userId)
          })
      }
  })
});
router.post('/login', function(req, res, next) {
  auth.passport.authenticate('local', function(err, user, info) {
            if(err) {
                res.render('login', {error: err})
            } else if (user) {
                req.session.userId = user.id;
                res.redirect('/client/' + req.session.userId);
            }
    })(req, res, next);
});

module.exports = router;
