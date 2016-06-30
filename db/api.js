var knex = require('./knex');

module.exports = {
  addUser: function(body){
    return knex('client').insert(body, 'id');
  },

  addPlaceToDo: function(body, userid){
    return knex('place').insert(body, 'id')
    .then(function(id){
      console.log('this is the id' + id)
      return knex('client_place').insert({
        client_id: userid,
        place_id: id[0],
        have_visited: false
      })
    })
  },

  addPlaceVisited: function(body, userid){
    return knex('place').insert(body, 'id')
    .then(function(id){
      console.log('this is the id' + id)
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

  getCategories: function(){
    return knex('category').select();
  },

  getComments: function(id) {
    return Promise.all([
      knex('place')
        .join('comment', function(){
          this.on('place.id', 'place_id');
        }).select('comment_body', 'comment.id as comment_id').where('place.id', id).first(),
      knex('client')
        .join('comment', function(){
          this.on('client_id', 'client.id');
        }).select('username').where('place_id', id).first()
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
    findPlaceIdByLatLng: function(lat, lng) {
        console.log("Lat: ",lat)
        console.log("Lng: ",lng)
         knex('place')
         .where('lat', '=', Number(lat).toFixed(4)).andWhere('lng', '=', Number(lng).toFixed(3))
         .then(function(data) {
             console.log("MY Api method DATA",data)
             return data;
         })
    }
}
