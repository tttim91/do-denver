var map;
var service;
var infowindow;
var denver = {
    lat: 39.7645187,
    lng: -104.9951978
};

//Initializes the map with all options
function initMap() {

    var denverObject = new google.maps.LatLng(39.7645187, -104.9951978);
    //map options
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
        maxZoom: 14,
        minZoom: 9,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
            style: google.maps.ZoomControlStyle.SMALL //or DEFAULT
        },
        panControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
    }

    //actual map object
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //Dynamically changes initial map type to roadmap
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

    detectBrowser();

    // var image = {
    //     url: 'http://icons.iconarchive.com/icons/flat-icons.com/flat/128/Beer-icon.png',
    //     // This marker is 20 pixels wide by 32 pixels high.
    //     size: new google.maps.Size(70, 30)
    // };

    // var marker = new google.maps.Marker({
    //     position: denver,
    //     map: map,
    //     animation: google.maps.Animation.DROP, //Drops marker from above into position
    //     title: 'Click to zoom'
    //         // icon: image
    // });

    //To remove marker from map --> marker.setMap(null); marker = null;

    //Can create array of markers and can iterate through --> do above command for each marker, then set markerArray.length = 0;
    // var marker2 = new google.maps.Marker({
    //     position: {
    //         lat: 39.7667618,
    //         lng: -104.9461027
    //     },
    //     map: map,
    //     title: 'marker 2'
    // });
    //
    // infowindow = new google.maps.InfoWindow({
    //     content: "Test"
    // });
    // //
    // // marker.addListener('click', toggleBounce);

    // var request = {
    //     location: denverObject,
    //     radius: 50000,
    //     types: ['amusement_park']
    // };
    //
    var request = {
        placeId: 'ChIJBf_eksB4bIcRpc3LOaKiFrM'
    };

    // var request = {
    //     location: denverObject,
    //     radius: '500',
    //     query: 'restaurant'
    // };
    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);

    // service2 = new google.maps.places.PlacesService(map);
    // service2.textSearch(request, callback2);
    // service = new google.maps.places.PlacesService(map);
    // // createPhotoMarker(service);
    // service.nearbySearch(request, callback);
    // //service.textSearch(request, callback) for text search (must include query: '' in request object)
    //

    // map.addListener('center_changed', function() {
    //     // 3 seconds after the center of the map has changed, pan back to the
    //     // marker.
    //     window.setTimeout(function() {
    //         map.panTo(marker.getPosition());
    //     }, 3000);
    // });

    // marker.addListener('click', function() {
    //     map.setZoom(8);
    //     map.setCenter(ma rker.getPosition());
    // });

    // marker2.addListener('click', function() {
    //     infowindow.open(map, marker2);
    // });

    $.get('/clients/sendData').then(function(data) {
        placeClientMarkers(data[0], data[1]);
    });

    function placeClientMarkers (userId, data) {
           for(var i=0; i<data.length; i++) {
           // console.log("Starting placeClientMarkers function");
           // console.log(data[0].lat);
           // console.log(data[0].lng);
               var marker = new google.maps.Marker({
                 map: map,
                 position: {lat:data[i].lat,
                            lng:data[i].lng}
               });
               attachDetails(marker, data[i]);
           }
   }
    //infowindow.close will close the window

    //Can move infowindow to other marker by calling infowindow.open(map.marker3)

    // // Shows public transportation system
    // var transitLayer = new google.maps.TransitLayer();
    // transitLayer.setMap(map);

    //Shows bike paths
    // var bikeLayer = new google.maps.BicyclingLayer();
    // bikeLayer.setMap(map);
    //
    // var trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(map);

    // map.data.loadGeoJson('denver.geojson');

    //Create DIV to hold custom control
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map, denver);

    centerControlDiv.index = 1;
    centerControlDiv.style['padding-top'] = '10px';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    // var secretMessage = "This is the secret message";
    // attachSecretMessage(marker, secretMessage);
}


//


function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(place);
        createMarker(place);
        var data = {
            name: place.name,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            image_url: place.url,
            category: place.types[0]
        }
        console.log(data);
        $.post('/clients/addPlace', data);
    }
}

// function callback2(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     console.log(results);
//     console.log("Posting results")
//     $.post('clients/listPlaces', results)
//     console.log("Results posted")
//   }
// }







 function createMarker(place) {
        var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
  });

  // google.maps.event.addListener(marker, 'click', function() {
  //   infowindow.setContent(place.name);
  //   infowindow.open(map, this);
  // });
}

//
// function createPhotoMarker(place) {
//   var photos = place.photos;
//   if (!photos) {
//     return;
//   }
//
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location,
//     title: place.name,
//     icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
//   });
// }

//Detects if the broswer is android or iphone and adjusts the map
function detectBrowser() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("map");

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
    } else {
        mapdiv.style.width = '600px';
        mapdiv.style.height = '800px';
    }
}

/**
 * The CenterControl adds a control to the map that recenters the map on
 * Denver.
 * @constructor
 * @param {!Element} controlDiv
 * @param {!google.maps.Map} map
 * @param {?google.maps.LatLng} center
 */
function CenterControl(controlDiv, map, center) {
    // We set up a variable for this since we're adding event listeners
    // later.
    var control = this;

    // Set the center property upon construction
    control.center_ = center;
    controlDiv.style.clear = 'both';

    // Set CSS for the control border
    var goCenterUI = document.createElement('div');
    goCenterUI.id = 'goCenterUI';
    goCenterUI.title = 'Click to recenter the map';
    controlDiv.appendChild(goCenterUI);

    // Set CSS for the control interior
    var goCenterText = document.createElement('div');
    goCenterText.id = 'goCenterText';
    goCenterText.innerHTML = 'Center Map';
    goCenterUI.appendChild(goCenterText);

    // Set CSS for the setCenter control border
    var setCenterUI = document.createElement('div');
    setCenterUI.id = 'setCenterUI';
    setCenterUI.title = 'Click to change the center of the map';
    controlDiv.appendChild(setCenterUI);

    // Set CSS for the control interior
    var setCenterText = document.createElement('div');
    setCenterText.id = 'setCenterText';
    setCenterText.innerHTML = 'Set Center';
    setCenterUI.appendChild(setCenterText);

    // Set up the click event listener for 'Center Map': Set the center of
    // the map
    // to the current center of the control.
    goCenterUI.addEventListener('click', function() {
        var currentCenter = control.getCenter();
        map.setCenter(currentCenter);
    });

    // Set up the click event listener for 'Set Center': Set the center of
    // the control to the current center of the map.
    setCenterUI.addEventListener('click', function() {
        var newCenter = map.getCenter();
        control.setCenter(newCenter);
    });
}

/**
 * Define a property to hold the center state.
 * @private
 */
CenterControl.prototype.center_ = null;

/**
 * Gets the map center.
 * @return {?google.maps.LatLng}
 */
CenterControl.prototype.getCenter = function() {
    return this.center_;
};

/**
 * Sets the map center.
 * @param {?google.maps.LatLng} center
 */
CenterControl.prototype.setCenter = function(center) {
    this.center_ = center;
};

// //Place a marker on click and pan to the marker.
// function placeMarkerAndPanTo(latLng, map) {
//     var marker = new google.maps.Marker({
//         position: latLng,
//         map: map
//     });
//     map.panTo(latLng);
// }
// //
// Attaches an info window to a marker with the provided message. When the
// marker is clicked, the info window will open with the secret message.
function attachDetails(marker, message) {
    var infowindow = new google.maps.InfoWindow({
        content: message.place_name + " - " + message.description
    });

    marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);
    });
}


//Causes narjers to bounce
// function toggleBounce() {
//   if (marker.getAnimation() !== null) {
//     marker.setAnimation(null);
//   } else {
//     marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }
//
// //To make a marker drop pattern
// function drop() {
//     for (var i = 0; i < markerArray.length; i++) {
//         setTimeout(function() {
//             addMarkerMethod();
//         }, i * 200);
//     }
// }
