var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');

router.get('/', function(req, res, next){
  knex('client').then(function(user){
    res.render ('clients/client',{title: 'sanity check', user: user});
  })
})

module.exports = router;
