var knex = require('./knex');

module.exports = {
  addUser: function(body){
    return knex('client').insert(body, 'id');
  },

  addPlace: function(body, userid){
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

  // addClientPlace: function(userid, placeid) {
  //   return knex('client_place').insert({
  //     client_id: userid,
  //     place_id: placeid,
  //     have_visited: false
  //   })
  // },

  findUserById: function(id) {
        return knex('client').where({id:id}).first();
    },
  findUserByUsername: function (username){
    return knex('client').select().where({username: username}).first();
  },
  editPlace: function(body){
    return knex('place').where('place.id', body.id).update(body)
  },

  deletePlace: function(id){
    return knex('place').where('place.id', id).del()
  },

  getCategories: function(){
    return knex('category').select();
  },

  getPlaces: function(id){
    return knex('client').where('client.id', id).first()
    .then(function(client){
      return knex('client_place').where('client_id', client.id).pluck('place_id')
    }).then(function(ids){
      return knex('place').whereIn('id', ids)
    }).then(function(results){
      return results;
    })
  },
  joinAll: function(userId) {
        return knex('client').select('client.first_name', 'client.last_name', 'client.username', 'client.id as client_id', 'client.password', 'place.id as place_id', 'place.name as place_name', 'place.lat', 'place.lng', 'place.description', 'place.image_url', 'category.name as category_name')
        .join('client_place', function() {
            this.on('client.id', '=', 'client_place.client_id');
        }).join('place', function() {
            this.on('place.id', '=', 'client_place.place_id');
        }).join('category', function() {
            this.on('place.category_id', '=', 'category.id');
        }).where('client.id', '=', userId)
    }
}
