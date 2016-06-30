var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');
var geo = require('../../geocode/geocode')

router.get('/todo', auth.isNotLoggedIn, function(req, res, next){
  db.getCategories()
  .then(function(categories){
    db.getNotVisitedPlaces(req.session.userId).then(function(places){
      res.render('clients/todo', {categories: categories, places:places, id: req.session.userId});
    })
  })
});

router.get('/havedone/:id/update', function(req, res, next){
    db.editVisited(req.params.id).then(function(){
      res.redirect ('/clients/todo');
  }).catch(function(error){
    next()
  })
})

router.post('/todo', function (req, res, next) {


  geo.geocoder.geocode(req.body.address)
  .then(function(data){
    req.body.lat = data[0].latitude
    req.body.lng = data[0].longitude
    delete req.body.address
    db.addPlaceToDo(req.body, req.session.userId)
      .then(function() {
        res.redirect('/clients/todo');
    })
  })
});


module.exports = router;
