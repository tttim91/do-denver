
exports.up = function(knex, Promise) {
  return knex.schema.createTable('client_place', function(table){
    table.integer('client_id').references('id').inTable('client').onDelete('cascade');
    table.integer('place_id').references('id').inTable('place').onDelete('cascade');
    table.boolean('have_visited');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('client_place');
};
