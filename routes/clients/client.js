var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');

router.get('/client', function(req, res, next){
  knex('client').then(function(user){
    res.render ('client',{title: 'sanity check', user: user});
  })
})
