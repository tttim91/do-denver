
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function(){
      return Promise.all([
        // Inserts seed entries
        knex('category').insert({name: 'restaurant'}),
        knex('category').insert({name: 'amusement_park'}),
        knex('category').insert({name: 'aquarium'}),
        knex('category').insert({name: 'art_gallery'}),
        knex('category').insert({name: 'bakery'}),
        knex('category').insert({name: 'bank'}),
        knex('category').insert({name: 'bar'}),
        knex('category').insert({name: 'book_store'}),
        knex('category').insert({name: 'bowling_alley'}),
        knex('category').insert({name: 'cafe'}),
        knex('category').insert({name: 'clothing_store'}),
        knex('category').insert({name: 'convenience_store'}),
        knex('category').insert({name: 'department_store'}),
        knex('category').insert({name: 'electronics_store'}),
        knex('category').insert({name: 'furniture_store'}),
        knex('category').insert({name: 'gas_station'}),
        knex('category').insert({name: 'grocery_or_supermarket'}),
        knex('category').insert({name: 'gym'}),
        knex('category').insert({name: 'hardware_store'}),
        knex('category').insert({name: 'home_goods_store'}),
        knex('category').insert({name: 'library'}),
        knex('category').insert({name: 'lodging'}),
        knex('category').insert({name: 'movie_theater'}),
        knex('category').insert({name: 'museum'}),
        knex('category').insert({name: 'night_club'}),
        knex('category').insert({name: 'park'}),
        knex('category').insert({name: 'post_office'}),
        knex('category').insert({name: 'school'}),
        knex('category').insert({name: 'shoe_store'}),
        knex('category').insert({name: 'shopping_mall'}),
        knex('category').insert({name: 'spa'}),
        knex('category').insert({name: 'stadium'}),
        knex('category').insert({name: 'university'}),
        knex('category').insert({name: 'zoo'})
      ]);
    })
};
