
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
      return Promise.all([
        // Inserts seed entries
        knex('client').insert({first_name: 'Tim', last_name: 'Musgrove'}),
        knex('client').insert({first_name: 'Steven', last_name: 'Lawson'}),
        knex('client').insert({first_name: 'Mairin', last_name:'Bailey'}),
        knex('client').insert({first_name: 'Lucas', last_name:'Barbula'})
      ]);
};
