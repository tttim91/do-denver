var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');

router.get('/todo', auth.isNotLoggedIn, function(req, res, next){
  res.render('clients/todo');
});

router.post('/todo', function (req, res, next){
  res.redirect('/clients');
});


module.exports = router;
