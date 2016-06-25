
exports.up = function(knex, Promise) {
  return knex.schema.createTable('place', function(table){
    table.increments();
    table.text('name');
    table.float('lat', 4, 7);
    table.float('long', 4, 7);
    table.text('description');
    table.text('image_url');
    table.integer('category_id').references('id').inTable('category').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('place');
};
