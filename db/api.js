var knex = require('./knex');

module.exports = {
  addUser: function(body){
    return knex('client').insert(body, 'id');
  },

  addPlaceToDo: function(body, userid){
    return knex('place').insert(body, 'id')
    .then(function(id){
      return knex('client_place').insert({
        client_id: userid,
        place_id: id[0],
        have_visited: false
      })
    })
  },

  addMyPlaceToDo: function(body, userid) {
      return knex('client_place').insert({
          client_id: userid,
          place_id: body.id,
          have_visited: false
      })
  },

  addMyPlaceDone: function(body, userid) {
      return knex('client_place').insert({
          client_id: userid,
          place_id: body.id,
          have_visited: true
      })
  },

  addComment: function(body){
    return knex('comment').insert(body, 'id')
  },

  addPlaceVisited: function(body, userid){
    return knex('place').insert(body, 'id')
    .then(function(id){
      return knex('client_place').insert({
        client_id: userid,
        place_id: id[0],
        have_visited: true
      })
    })
  },

  findUserById: function(id) {
        return knex('client').where({id:id}).first();
    },
  findUserByUsername: function (username){
    return knex('client').select().where({username: username}).first();
  },
  editPlace: function(body){
    return knex('place').where('place.id', body.id).update(body)
  },

  editVisit: function (body) {
    return knex('client_place').where('place_id', body.id).update(body)
  },

  editNotVisit: function (id) {
    return knex('client_place').where('place_id', id).update('have_visited', false)
  },

  editVisited: function (id) {
    return knex('client_place').where('place_id', id).update('have_visited', true)
  },

  deletePlace: function(id){
    return knex('place').where('place.id', id).del()
  },

  deleteComment: function(id){
      return knex('comment').where('comment.id', id).del()
  },

  getCategories: function(){
    return knex('category').select();
  },

  getComments: function(id) {
    return Promise.all([
    knex('comment').where('place_id', id)
    .join('client', function(){
      this.on('client_id', 'client.id')
    }).select('client.id as clientId', 'comment.id as commentId',       'client.username', 'comment.comment_body'),
    knex('place').where('place.id', id).first()
    ])
  },

  getVisitedPlaces: function(id){
    return knex('client').where('client.id', id).first()
    .then(function(client){
      return knex('client_place').where({
        client_id: client.id,
        have_visited: true
      }).pluck('place_id')
    }).then(function(ids){
      return knex('place').whereIn('id', ids)
    }).then(function(results){
      return results;
    })
  },

  getNotVisitedPlaces: function(id){
    return knex('client').where('client.id', id).first()
    .then(function(client){
      return knex('client_place').where({
        client_id: client.id,
        have_visited: false
      }).pluck('place_id')
    }).then(function(ids){
      return knex('place').whereIn('id', ids)
    }).then(function(results){
      return results;
    })
  },

  joinAll: function(userId) {
        return knex('client').select('client.first_name', 'client.last_name', 'client.username', 'client.id as client_id', 'client.password', 'place.id as place_id', 'place.name as place_name', 'place.lat', 'place.lng', 'place.description', 'place.image_url', 'category.name as category_name', 'client_place.have_visited')
        .join('client_place', function() {
            this.on('client.id', '=', 'client_place.client_id');
        }).join('place', function() {
            this.on('place.id', '=', 'client_place.place_id');
        }).join('category', function() {
            this.on('place.category_id', '=', 'category.id');
        }).where('client.id', '=', userId)
    },

    getRecommendedPlaces: function() {
        return knex('place').select('place.id', 'place.name', 'place.image_url')
        .then(function(places) {
            var randomPlaces = [];
            for(var i=0; i<5; i++) {
                randomPlaces.push(places[Math.floor(Math.random()*places.length)])
            }
            return randomPlaces;
        })
    }
}
