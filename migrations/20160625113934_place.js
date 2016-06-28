
exports.up = function(knex, Promise) {
  return knex.schema.createTable('place', function(table){
    table.increments();
    table.text('name');
    table.float('lat', 10, 6);
    table.float('lng', 10, 6);
    table.text('description');
    table.text('image_url');
    table.boolean('user_created');
    table.integer('category_id').references('id').inTable('category').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('place');
};
