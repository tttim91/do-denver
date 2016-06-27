var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

router.get('/client/havedone', function(req, res, next){
  res.render('havedone');
});

router.post('/client/havedone', function (req, res, next){
  res.redirect('/client');
});
