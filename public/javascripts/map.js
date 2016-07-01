var map;
var service;
var infowindow;
var denver = {
    lat: 39.7645187,
    lng: -104.9951978
};

function initMap() {

    var denverObject = new google.maps.LatLng(39.7645187, -104.9951978);

    var mapOptions = {
        center: denver,
        zoom: 11,
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        minZoom: 9,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
            style: google.maps.ZoomControlStyle.SMALL //or DEFAULT
        },
        panControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

    detectBrowser();

    // google.maps.event.addListener(map, 'center_changed', function() {
    //             window.setTimeout(function() {
    //               map.setCenter(denver);
    //             });
    //         });

    $.get('/clients/sendData').then(function(data) {
        placeClientMarkers(data[0], data[1]);
    });

}


function placeClientMarkers(userId, data) {
    for (var i = 0; i < data.length; i++) {
        if(data[i].have_visited == true) {
            var marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: data[i].lat,
                    lng: data[i].lng
                }
            });
        } else {
            var marker = new google.maps.Marker({
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                position: {
                    lat: data[i].lat,
                    lng: data[i].lng
                }
            });
        }
        attachDetails(marker, data[i]);
    }
}

// Attaches an info window to a marker with the provided message. When the
// marker is clicked, the info window will open with the secret message.
function attachDetails(marker, message) {
    var infowindow = new google.maps.InfoWindow({
        content: message.place_name
    });

    marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);
    });
}

function detectBrowser() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("map");

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
    } else {
        mapdiv.style.width = '60vw';
        mapdiv.style.height = '50vh';
    }
}
