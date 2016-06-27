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
  }
}
