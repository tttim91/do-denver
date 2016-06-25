
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function(){
      return Promise.all([
        // Inserts seed entries
        knex('category').insert({name: 'restaurant'}),
        knex('category').insert({name: 'bookstore'}),
        knex('category').insert({name: 'cafe'}),
        knex('category').insert({name: 'stadium'})
      ]);
    })
};
