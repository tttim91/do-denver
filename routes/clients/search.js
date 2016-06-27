var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
// var db = require('../db/api');

router.get('/search', function(req, res, next){
  res.render('clients/search');
});

router.post('/search', function (req, res, next){
  res.redirect('/');
});


module.exports= router;
