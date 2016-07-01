var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');
var request = require('request');

function imageReferenceToImage(reference) {
    request("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+reference+"&key=AIzaSyCBzg50_Ei3s8Y6QWVBTzTz3imX-eVqGw8", function(error, response, body) {
        return body;
    })

}

router.get('/search', auth.isNotLoggedIn, function(req, res, next){
    if(req.query.category) {
        request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.7645187,-104.9951978&radius=50000&type="+req.query.category+"&name="+req.query.query+"&key=AIzaSyCBzg50_Ei3s8Y6QWVBTzTz3imX-eVqGw8", function (error, response, body) {
            var answer = [];
            if (!error && response.statusCode == 200) {
                var output = JSON.parse(body)
                knex('category').select('id').where('name', '=', req.query.category).first().then(function(id) {
                    for(var i=0; i<output.results.length; i++) {
                        if(output.results[i].icon) {
                            answer.push({name: output.results[i].name, address: output.results[i].vicinity, lat: output.results[i].geometry.location.lat, lng: output.results[i].geometry.location.lng, description: "Google Places Generated Place (No Description)", image: output.results[i].icon, user_created: false, category_id: id.id, rating: output.results[i].rating})
                        } else {
                            answer.push({name: output.results[i].name, address: output.results[i].vicinity, lat: output.results[i].geometry.location.lat, lng: output.results[i].geometry.location.lng, description: "Google Places Generated Place (No Description)", image: "http://www.nattynutrition.com/layout/images/NoPhotoDefault.png?1298563334", user_created: false, category_id: id.id, rating: output.results[i].rating})
                        }
                    }
                    res.render('clients/search', {answer: answer, query: req.query.query, category: req.query.category, id: req.session.userId});

                })
            }
        })
    } else {
        res.render('clients/search', {id: req.session.userId});
    }

});

router.post('/search', function (req, res, next){
  res.redirect('/');
});


module.exports = router;
