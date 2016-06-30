
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table){
    table.increments();
    table.text('comment_body');
    table.integer('place_rating');
    table.integer('client_id').references('id').inTable('client').onDelete('cascade');
    table.integer('place_id').references('id').inTable('place').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment');
};
