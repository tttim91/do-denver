var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');

router.get('/', auth.isNotLoggedIn, function(req, res, next){
  db.findUserById(req.session.userId)
  .then(function(user) {
    res.render ('clients/client',{title: 'sanity check', user: user.username});
  })
})
router.get('/logout', function(req, res, next){
  req.session = null
  res.redirect('/')
})
router.get('/sendData', function(req, res, next){
  console.log("sendData route received");
  return db.joinAll(25).then(function(data){
    console.log(data);
    res.send(data);
    res.render('index', {title: 'Express'})
  })
})
module.exports = router;
