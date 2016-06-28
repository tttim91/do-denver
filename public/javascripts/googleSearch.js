$.get("https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&name=cruise&key=AIzaSyCBzg50_Ei3s8Y6QWVBTzTz3imX-eVqGw8", function(data) {
    console.log(data);
    var length = data.results.length;
    console.log(length);
    var myData = {data: data, length: length};
    $.post('/clients/seePlaces', myData);
})
