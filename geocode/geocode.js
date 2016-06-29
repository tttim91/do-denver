var NodeGeocoder = require('node-geocoder')

var options = {
  provider: 'google',
   httpAdapter: 'https',
  apiKey: 'AIzaSyCBzg50_Ei3s8Y6QWVBTzTz3imX-eVqGw8',
  formatter: null
};

var geocoder = NodeGeocoder(options);

module.exports = {
  convert: function (address){
    geocoder.geocode(address)
  }
}
