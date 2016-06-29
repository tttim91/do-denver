var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');

router.get('/todo', auth.isNotLoggedIn, function(req, res, next){
  db.getCategories().then(function(categories){
    db.getNotVisitedPlaces(req.session.userId).then(function(places){
      // console.log(places, categories)
      res.render('clients/todo', {categories: categories, places:places});
    })
  })
});

router.get('/havedone/:id/update', function(req, res, next){
      console.log(req.params.id)
    db.editVisited(req.params.id).then(function(){
      res.redirect ('/clients/todo');
  }).catch(function(error){
    next()
  })
})


router.post('/todo', function (req, res, next){
  db.addPlace(req.body, req.session.userId).then(function() {
    console.log(req.body, req.session.userId)
      res.redirect('/clients/todo');
  })
});


module.exports = router;
