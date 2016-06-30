$('.addToDo').click(function() {
    var name = $(this).parent().find('p:nth-child(2)').html();
    console.log(name);
    var lat = $(this).parent().find('p:nth-child(4)').html();
    var lng = $(this).parent().find('p:nth-child(6)').html();
    var description = $(this).parent().find('p:nth-child(8)').html();
    var image_url = $(this).parent().find('p:nth-child(10)').html();
    var user_created = $(this).parent().find('p:nth-child(12)').html();
    var category = $(this).parent().find('p:nth-child(14)').html();
    var place = {name:name, lat: lat, lng: lng, description:description, image_url:image_url, user_created:user_created, category_id:category};
    console.log("Add To Do Frontend check")
    console.log(place);
    $(this).append("<p>Place added in To Do List!</p>").fadeIn(300).delay(1000).fadeOut(300);
    $.post('/clients/sendToDo', place)
})

$('.addDone').click(function() {
    var name = $(this).parent().find('p:nth-child(2)').html();
    var lat = $(this).parent().find('p:nth-child(4)').html();
    var lng = $(this).parent().find('p:nth-child(6)').html();
    var description = $(this).parent().find('p:nth-child(8)').html();
    var image_url = $(this).parent().find('p:nth-child(10)').html();
    var user_created = $(this).parent().find('p:nth-child(12)').html();
    var category = $(this).parent().find('p:nth-child(14)').html();
    var place = {name:name, lat: lat, lng: lng, description:description, image_url:image_url, user_created:user_created, category_id:category};
    console.log(place);
    $(this).append("<p>Place added in Have Done List!</p>").fadeIn(300).delay(1000).fadeOut(300);
    $.post('/clients/sendDone', place)
})

$('.expand').click(function() {
    $(this).prev().toggleClass('hidden');
    if($(this).text() === "Show Details") {
        $(this).html("Hide Details")
    } else {
        $(this).html("Show Details")
    }
})

function initMap() {
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(39.927682, -105.237583),
        new google.maps.LatLng(39.507912, -104.808508));

        var options = {bounds: defaultBounds};
        console.log("About to select input")
        var input = document.getElementsByClassName('searchTerm')[0];
        autocomplete = new google.maps.places.Autocomplete(input, options);
}
