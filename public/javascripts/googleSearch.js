$('.addToDo').click(function() {
    var name = $(this).parent().find('p:nth-child(1)').html();
    var lat = $(this).parent().find('p:nth-child(2)').html();
    var lng = $(this).parent().find('p:nth-child(3)').html();
    var description = $(this).parent().find('p:nth-child(4)').html();
    var image_url = $(this).parent().find('p:nth-child(5)').html();
    var user_created = $(this).parent().find('p:nth-child(6)').html();
    var category = $(this).parent().find('p:nth-child(7)').html();
    var place = {name:name, lat: lat, lng: lng, description:description, image_url:image_url, user_created:user_created, category_id:category};
    console.log(place);
    $.post('/clients/sendToDo', place)
})

$('.addDone').click(function() {
    var name = $(this).parent().find('p:nth-child(1)').html();
    var lat = $(this).parent().find('p:nth-child(2)').html();
    var lng = $(this).parent().find('p:nth-child(3)').html();
    var description = $(this).parent().find('p:nth-child(4)').html();
    var image_url = $(this).parent().find('p:nth-child(5)').html();
    var user_created = $(this).parent().find('p:nth-child(6)').html();
    var category = $(this).parent().find('p:nth-child(7)').html();
    var place = {name:name, lat: lat, lng: lng, description:description, image_url:image_url, user_created:user_created, category_id:category};
    console.log(place);
    $.post('/clients/sendDone', place)
})

$('.expand').click(function() {
    $(this).prev('.hidden').toggle();
    if($(this).text() === "Show Details") {
        $(this).html("Hide Details")
    } else {
        $(this).html("Show Details")
    }
})
