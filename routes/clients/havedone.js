var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');

router.get('/havedone', function(req, res, next){
  res.render('clients/havedone');
});

router.post('/havedone', function (req, res, next){
  res.redirect('/');
});


module.exports = router;
