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
    res.render ('clients/client',{user: user.first_name, id: req.session.userId});
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
  })
})

router.post('/addPlace', function(req, res, next) {
    knex('place').insert(
      {name: req.body.name,
        lat:req.body.lat,
        lng:req.body.lng,
        description:"N/A",
        image_url:req.body.image_url,
        category_id: 37
      }).then(function() {
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
    res.render('clients/search', {output: output})
})

router.post('/sendToDo', function(req, res, next) {
    var placeExists = false;
    var clientOwnsPlace = false;
    var place_id;
    Promise.all([knex('place').select('lat', 'lng', 'id'),
    knex('client').select('client.id as client_id', 'place.id as place_id', 'client.username', 'place.lat', 'place.lng').join('client_place', function() {
        this.on('client.id', '=', 'client_place.client_id')
    }).join('place', function() {
        this.on('client_place.place_id', '=', 'place.id')
    }).where('client.id', '=', req.session.userId)])
    .then(function(data) {
        for(var j=0; j<2; j++) {
            for(var i=0; i<data[j].length; i++) {
                if(data[j][i].lat == Number(req.body.lat).toFixed(4) && data[j][i].lng == Number(req.body.lng).toFixed(3)) {
                    if(j==0) {
                        placeExists = true;
                        place_id = data[0][i].id;
                    } else {
                        clientOwnsPlace = true;
                    }
                }
            }
        }
        if(placeExists == false && clientOwnsPlace == false) {
            db.addPlaceToDo(req.body, req.session.userId).then(function(){
                res.redirect('/clients/todo')
            })
        } else if(placeExists == true && clientOwnsPlace == false) {
            console.log(place_id)
            knex('client_place').insert({client_id: req.session.userId, place_id: place_id, have_visited: false}).then(function() {
                res.redirect('/clients/todo')
            })
        } else {
            res.redirect('/clients/search')
        }
    })
})

router.post('/sendDone', function(req, res, next) {
    var placeExists = false;
    var clientOwnsPlace = false;
    var place_id;
    Promise.all([knex('place').select('lat', 'lng', 'id'),
    knex('client').select('client.id as client_id', 'place.id as place_id', 'client.username', 'place.lat', 'place.lng').join('client_place', function() {
        this.on('client.id', '=', 'client_place.client_id')
    }).join('place', function() {
        this.on('client_place.place_id', '=', 'place.id')
    }).where('client.id', '=', req.session.userId)])
    .then(function(data) {
        for(var j=0; j<2; j++) {
            for(var i=0; i<data[j].length; i++) {
                if(data[j][i].lat == Number(req.body.lat).toFixed(4) && data[j][i].lng == Number(req.body.lng).toFixed(3)) {
                    if(j==0) {
                        placeExists = true;
                        place_id = data[0][i].id;
                    } else {
                        clientOwnsPlace = true;
                    }
                }
            }
        }
        if(placeExists == false && clientOwnsPlace == false) {
            db.addPlaceToDo(req.body, req.session.userId).then(function(){
                res.redirect('/clients/todo')
            })
        } else if(placeExists == true && clientOwnsPlace == false) {
            console.log(place_id)
            knex('client_place').insert({client_id: req.session.userId, place_id: place_id, have_visited: false}).then(function() {
                res.redirect('/clients/todo')
            })
        } else {
            res.redirect('/clients/search')
        }
    })
})
module.exports = router;
