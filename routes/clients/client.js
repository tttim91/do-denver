var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');

router.get('/', auth.isNotLoggedIn, function(req, res, next){
  console.log(req.session)
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
  return db.joinAll(req.session.userId).then(function(data){
    res.send([req.session.userId,data]);
    res.render('index', {title: 'Express'})
  })
})

router.post('/addPlace', function(req, res, next) {
    knex('place').insert({name: req.body.name, lat:req.body.lat, lng:req.body.lng, description:"N/A", image_url:req.body.image_url, category_id: 37}).then(function() {
        res.redirect('/');
    })
})
router.post('/seePlaces', function(req, res, next) {
    console.log("Post Recieved");
    console.log(req.body.length);
    for(var i=0; i<req.body.length; i++) {
        console.log(req.body['data[results]['+i+'][name]'])
    }

})
// router.post('/listPlaces', function(req, res, next) {
//     console.log(" List places Post request recieved")
//     console.log(req.body);
//
// })
module.exports = router;
