
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('client_place').del()
    .then(function(){
      return knex('place').del()
    })
      .then(function(){
        return knex('category').del()
      })
        .then(function(){
          return knex('client').del()
        })
};
