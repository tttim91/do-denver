var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');

router.get('/havedone', auth.isNotLoggedIn, function(req, res, next){
  db.getVisitedPlaces(req.session.userId).then(function(places){
  res.render('clients/havedone', {places: places, id: req.session.userId});
  })
});
router.get('/havedone/:id', function(req, res, next){
  db.getComments(req.params.id).then(function(results){
    console.log('results:' + results[0].comment_body)
    res.render('clients/details', {results: results, id: req.session.userId})
  })
})

router.get('/havedone/:id/comment', function(req, res, next) {
  db.addComment(req.body).then(funciton(){
    res.redirect('/clients/havedone/:id')
  })
})

router.get('/havedone/:id/delete', function(req, res, next){
    db.deletePlace(req.params.id).then(function(){
      res.redirect ('/clients/havedone');
  }).catch(function(error){
    next()
  })
})

router.post('/havedone', function (req, res, next) {
  db.editPlace(req.body)
    .then(function(){
      res.redirect('/clients/havedone');
    })
});


module.exports = router;
