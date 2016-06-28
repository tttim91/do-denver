// $('.searchButton').click(function() {
//     console.log("Search Button clicked")
//     var categorySearch = $('.categorySearch').val();
//     var searchTerm = $('.searchTerm').val();
//     console.log(categorySearch);
//     console.log(searchTerm);
//     $.get("https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.7645187,-104.9951978&radius=5000&type="+categorySearch+"&name="+searchTerm+"&key=AIzaSyCBzg50_Ei3s8Y6QWVBTzTz3imX-eVqGw8", function(data) {
//         console.log(data);
//         var length = data.results.length;
//         console.log(length);
//         var myData = {data: data, length: length};
//         $.post('/clients/seePlaces', myData);
//     })
// })
