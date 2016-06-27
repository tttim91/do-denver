var knex = require('./knex');

module.exports = {
  addUser: function(body){
    return knex('client').insert(body, 'id');
  },
  findUserById: function(id) {
        return knex('client').where({id:id}).first();
    },
  findUserByUsername: function (username){
    return knex('client').select().where({username: username}).first();
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
  }
}
