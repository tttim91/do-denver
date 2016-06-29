var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');

router.get('/', function(req, res, next){
  console.log(req.session.userId)
  db.findUserById(req.session.userId)
  .then(function(user) {
      console.log(user)
    res.render ('clients/client',{title: 'sanity check', user: user.username});
  })
})

router.get('/logout', function(req, res, next){
  req.session = null
  res.redirect('/')
})

router.get('/sendData', function(req, res, next){
    console.log("Send Data route hit")
    return db.joinAll(req.session.userId).then(function(data){
    console.log("tables all joined")
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
    var output = [];
    console.log("Post Recieved HARD");
    console.log(req.body.length);
    for(var i=0; i<req.body.length; i++) {
        output.push(req.body['data[results]['+i+'][name]'])
    }
    console.log(output);
    res.render('clients/search', {output: output})
})
router.post('/sendPlace', function(req, res, next) {
    console.log("Send place Post request recieved")
    console.log(req.body);

    knex('place').insert({name:req.body.name, lat:req.body.lat, lng:req.body.lng, description:req.body.description, image_url: req.body.image_url,
    user_created: req.body.user_created, category_id: 1}).then(function() {
        res.redirect('/clients')
    });
    console.log("Finished inserting")
})
module.exports = router;
