var find = require('../helper')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(funciton(){
      return knex('client').select()
    })
      .then(function(clients){
        return knex('place').select()
      })
        .then(function (places) {
          return Promise.all([
            // Inserts seed entries
            knex('comment').insert({comment_body:"This is a test Comment from Mairin", place_rating: 5, client_id: find.findClient('mabaile', clients)}),
            knex('comment').insert({comment_body:"This is a test comment from Steven"),
            knex('comment').insert({comment_body:"This is a test comment from Tim"}),
            knex('comment').insert({comment_body:"This is a comment Lucas"})
          ]);
    });
};
