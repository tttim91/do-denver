var find = require('../helper')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('client_place').del()
    .then(function(){
      return knex('client').select()
      })
        .then(function(clients) {
          return knex('place').select()
          .then(function (places) {
            return Promise.all([
              // Inserts seed entries
              knex('client_place').insert({client_id: find.findClient('tttim', clients), place_id: find.findLocation('Tattered Cover Bookstore', places), have_visited: false}),
              knex('client_place').insert({client_id: find.findClient('tttim', clients), place_id: find.findLocation('Blue Pan Pizza', places), have_visited: false}),
              knex('client_place').insert({client_id: find.findClient('tttim', clients), place_id: find.findLocation('Amethyst Coffee', places), have_visited: true}),
              knex('client_place').insert({client_id: find.findClient('tttim', clients), place_id: find.findLocation('Downpours Coffee', places), have_visited: true}),
              knex('client_place').insert({client_id: find.findClient('mabaile', clients), place_id: find.findLocation('Blue Pan Pizza', places), have_visited: true}),
              knex('client_place').insert({client_id: find.findClient('mabaile', clients), place_id: find.findLocation("J's Noodles Star Thai", places), have_visited: true}),
              knex('client_place').insert({client_id: find.findClient('mabaile', clients), place_id: find.findLocation('Tattered Cover Bookstore', places), have_visited: true}),
              knex('client_place').insert({client_id: find.findClient('wolfshark', clients), place_id: find.findLocation('Tattered Cover Bookstore', places), have_visited: true}),
              knex('client_place').insert({client_id: find.findClient('wolfshark', clients), place_id: find.findLocation('Downpours Coffee', places), have_visited: true}),
              knex('client_place').insert({client_id: find.findClient('lbarbula', clients), place_id: find.findLocation('Amethyst Coffee', places), have_visited: true})
            ]);
          });
      })
};
