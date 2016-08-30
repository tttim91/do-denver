$('.addToDo').click(function() {
    var name = $(this).parent().find('p:nth-child(2)').html();
    var latLong = $(this).parent().find('p:nth-child(3)').html();
    var lngLong = $(this).parent().find('p:nth-child(4)').html();
    var lat = Number(latLong).toFixed(4);
    var lng = Number(lngLong).toFixed(3);
    var description = $(this).parent().find('p:nth-child(6)').html();
    var image = $(this).parent().find('p:nth-child(9)').html();
    var user_created = $(this).parent().find('p:nth-child(7)').html();
    var category = $(this).parent().find('p:nth-child(8)').html();
    var place = {name:name, lat: lat, lng: lng, description:description, image_url:image, user_created:user_created, category_id:category};
    $(this).append("<p>Place added in To Do List!</p>").fadeIn(300).delay(1000).fadeOut(300);
    $.post('/clients/sendToDo', place)
})

$('.addDone').click(function() {
    var name = $(this).parent().find('p:nth-child(2)').html();
    var latLong = $(this).parent().find('p:nth-child(3)').html();
    var lngLong = $(this).parent().find('p:nth-child(4)').html();
    var lat = Number(latLong).toFixed(4);
    var lng = Number(lngLong).toFixed(3);
    var description = $(this).parent().find('p:nth-child(6)').html();
    var image = $(this).parent().find('p:nth-child(9)').html();
    var user_created = $(this).parent().find('p:nth-child(7)').html();
    var category = $(this).parent().find('p:nth-child(8)').html();
    var place = {name:name, lat: lat, lng: lng, description:description, image_url:image, user_created:user_created, category_id:category};
    $(this).append("<p>Place added in Have Done List!</p>").fadeIn(300).delay(1000).fadeOut(300);
    $.post('/clients/sendDone', place)
})

$('.addToDoRec').click(function() {
    var name = $(this).parent().find('p:nth-child(2)').html();
    var id = $(this).parent().find('p:nth-child(3)').html();
    var place = {name: name, id:id};
    $(this).append("<p>Place added to To Do List!</p>").fadeIn(300).delay(1000).fadeOut(300);
    $.post('/clients/sendToDoRec', place);
})

$('.addDoneRec').click(function() {
    var name = $(this).parent().find('p:nth-child(2)').html();
    var id = $(this).parent().find('p:nth-child(3)').html();
    var place = {name: name, id:id};
    $(this).append("<p>Place added to Done List!</p>").fadeIn(300).delay(1000).fadeOut(300);
    $.post('/clients/sendDoneRec', place);
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
        var input = document.getElementsByClassName('searchTerm')[0];
        autocomplete = new google.maps.places.Autocomplete(input, options);
}
