
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('client').del()
    .then(function(){
      return Promise.all([
        // Inserts seed entries
        knex('client').insert({first_name: 'Tim', last_name: 'Musgrove', username: 'tttim', password: 'password'}),
        knex('client').insert({first_name: 'Steven', last_name: 'Lawson', username:'wolfshark', password: 'password'}),
        knex('client').insert({first_name: 'Mairin', last_name:'Bailey', username: 'mabaile', password: 'password'}),
        knex('client').insert({first_name: 'Lucas', last_name:'Barbula', username: 'lbarbula', password: 'password'})
      ]);    
    })
};
