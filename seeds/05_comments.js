var find = require('../helper')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(function(){
      return knex('client').select()
    })
      .then(function(clients){
        return knex('place').select()
        .then(function (places) {
          return Promise.all([
            // Inserts seed entries
              knex('comment').insert({comment_body:"This is a test Comment from Mairin", place_rating: 5, client_id: find.findClient('mabaile', clients), place_id:find.findLocation('Amethyst Coffee', places)}),
              knex('comment').insert({comment_body:"This is a test comment from Steven", place_rating: 3, client_id:find.findClient('wolfshark', clients), place_id:find.findLocation('Downpours Coffee', places)}),
              knex('comment').insert({comment_body:"This is a test comment from Tim", place_rating: 4, client_id:find.findClient('tttim', clients), place_id: find.findLocation('Tattered Cover Bookstore', places)}),
              knex('comment').insert({comment_body:"This is a comment Lucas", place_rating: 5, client_id: find.findClient('lbarbula', clients), place_id: find.findLocation("J's Noodles Star Thai", places)
            })
          ]);
    });
  })
};
