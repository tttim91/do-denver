var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');

router.get('/todo', auth.isNotLoggedIn, function(req, res, next){
  db.getCategories().then(function(categories){
    db.getPlaces(req.session.userId).then(function(places){
      // console.log(places, categories)
      res.render('clients/todo', {categories: categories, places:places});
    })
  })
});



router.post('/todo', function (req, res, next){
  db.addPlace(req.body).then(function(){
    res.redirect('/clients/todo');
  })
});


module.exports = router;
