var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');
var db = require('../../db/api');
var auth = require('../../auth');
var request = require('request');

router.get('/search', auth.isNotLoggedIn, function(req, res, next){
        request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.7645187,-104.9951978&radius=5000&type="+req.query.category+"&name="+req.query.query+"&key=AIzaSyCBzg50_Ei3s8Y6QWVBTzTz3imX-eVqGw8", function (error, response, body) {
            var answer = [];
            if (!error && response.statusCode == 200) {
                var output = JSON.parse(body)
                for(var i=0; i<output.results.length; i++) {
                    console.log(output.results[i].name);
                    answer.push({name: output.results[i].name, lat: output.results[i].geometry.location.lat, lng: output.results[i].geometry.location.lng, description: "N/A", image_url: output.results[0].photos[0].html_attributions[0], user_created: false, category_id: 20})
                }
            }
            res.render('clients/search', {answer:answer, query: req.query.query, category: req.query.category});
        })

});

router.post('/search', function (req, res, next){
  res.redirect('/');
});


module.exports = router;
