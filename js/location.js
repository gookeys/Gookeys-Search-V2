function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are Here '+ 'Latitude ' + pos.lat + ' Longitude ' + pos.lng);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
}
$(function () {
    //    $("#showMyLocation").click(function (event) {
    event.preventDefault();
    $(this).html('Determining address...');
    navigator.geolocation.getCurrentPosition(function (position) {
        var geocoder = new google.maps.Geocoder();
        var latLng   = new google.maps.LatLng( 
            position.coords.latitude, position.coords.longitude);
        geocoder.geocode({
            'latLng': latLng
        }, function (results, status) {
            for (var i = 0; i < results[0].address_components.length; i++) {
                var address = results[0].address_components[i];
                if (address.types[0] == "postal_code") {
                    $('#zipcode').html(address.long_name);
                    $('#location').html(results[0].formatted_address);
                    //                        $('#showMyLocation').hide();
                }
            }
        });
    });
    return false;
    //    });
});
