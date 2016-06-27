var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');

router.get('/search', auth.isNotLoggedIn, function(req, res, next){
  res.render('clients/search');
});

router.post('/search', function (req, res, next){
  res.redirect('/');
});


module.exports = router;
