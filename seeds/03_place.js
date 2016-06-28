var find = require('../helper').findLocation

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('place').del()
    .then(function(){
      return knex('category').select()
    })
      .then(function(categories){
        return Promise.all([
          // Inserts seed entries
          knex('place').insert({name: 'Blue Pan Pizza', lat: '39.7619737', lng: '-105.0410091', description: 'Light & modern pizzeria serving Italian specialties alongside Colorado-centric beer & cocktails.', image_url: 'http://s3-media3.fl.yelpcdn.com/bphoto/C8CWQsX_gjEs0yYWefQmGA/o.jpg', user_created:true, category_id: find('restaurant', categories)}),
          knex('place').insert({name: "J's Noodles Star Thai", lat: '39.6995265', lng: '-105.0277643', description: 'No-frills restaurant specializing in traditional Thai dishes including pad Thai & drunken noodles.', image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/ZY4GCJ47RPqXT3CgEdHgKg/ls.jpg', user_created:true, category_id: find('restaurant', categories)}),
          knex('place').insert({name: 'Tattered Cover Bookstore', lat: '39.7398312', lng: '-104.9588848', description: 'This longstanding indie bookstore offers a newsstand, new & used books, plus a cafe with free WiFi.', image_url: 'http://static1.squarespace.com/static/52e20152e4b02ca61f196512/52e5c8d4e4b0ca589cd14bee/52ec0436e4b008cb96e7418b/1391200265207/tattered-cover-book-store-bookstore-el-ateneo-2_28_550x370.jpg?format=1000w', user_created:true, category_id: find('bookstore', categories)}),
          knex('place').insert({name: 'Amethyst Coffee', lat: '39.734134', lng: ' -104.9900297', description: 'Carefully crafted coffee drinks & teas served in airy, modern surrounds with a patio & fire pit.', image_url: 'http://dailycoffeenews.com/wp-content/uploads/2015/02/IMG_3469-600x600.jpg',user_created:false, category_id: find('cafe', categories)}),
          knex('place').insert({name: 'Downpours Coffee', lat: '39.7718455', lng: '-105.0463288', description: 'Downpours Coffee on Tennyson Street serves locally roasted and sustainably sourced coffee to the Berkeley neighborhood of Denver.', image_url: 'https://peachmelbatoast.files.wordpress.com/2013/09/image_903.jpeg', user_created:false, category_id: find('cafe', categories)})
        ]);
      })
};
