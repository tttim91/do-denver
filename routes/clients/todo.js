var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');
var geo = require('../../geocode/geocode')

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

router.get('/todo/update', function(req, res, next){
  geo.geocoder.geocode(address).then(function(data){
    console.log(data)
    res.redirect('/clients/todo', {data: data})
  })
})

router.post('/todo', function (req, res, next) {
  // var NodeGeocoder = require('node-geocoder')
  //
  // var options = {
  //   provider: 'google',
  //    httpAdapter: 'https',
  //   apiKey: 'AIzaSyCBzg50_Ei3s8Y6QWVBTzTz3imX-eVqGw8',
  //   formatter: null
  // };
  // var geocoder = NodeGeocoder(options)
    db.addPlaceToDo(req.body, req.session.userId).then(function() {
      console.log(req.body, req.session.userId)
      res.redirect('/clients/todo');
    })
});


module.exports = router;
