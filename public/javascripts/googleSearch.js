$('.place').click(function() {
    var name = $(this).find('.hidden p:nth-child(1)').html();
    var lat = $(this).find('.hidden p:nth-child(2)').html();
    var lng = $(this).find('.hidden p:nth-child(3)').html();
    var description = $(this).find('.hidden p:nth-child(4)').html();
    var image_url = $(this).find('.hidden p:nth-child(5)').html();
    var user_created = $(this).find('.hidden p:nth-child(6)').html();
    var category = $(this).find('.hidden p:nth-child(7)').html();
    var place = {name:name, lat: lat, lng: lng, description:description, image_url:image_url, user_created:user_created, category:category};
    console.log(place);
    $.post('/clients/sendPlace', place)
})
