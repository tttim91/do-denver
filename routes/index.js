var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');
var auth = require('../auth');

router.get('/',  function(req, res, next){
  res.render('index', {title: 'Do Denver', id: req.session.userId, id: req.session.userId});
});

router.post('/login',
function(req, res, next) {
    auth.passport.authenticate('local', function(err, user, info) {
            if(err) {
                res.render('index', {error: err})
            } else if (user) {
                req.session.userId = user.id;
                res.redirect('/clients');
            }
    })(req, res, next);
});



module.exports = router;
