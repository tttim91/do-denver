
exports.up = function(knex, Promise) {
  return knex.schema.createTable('client', function(table){
    table.increments();
    table.text('first_name');
    table.text('last_name');
    table.text('username');
    table.text('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('client');
};
