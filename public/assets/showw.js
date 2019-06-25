var address;
var geocoder;
var map;
var marker;
var latLng;
var options;
initMap();
function initMap() {
    geocoder = new google.maps.Geocoder();
    options = {
      zoom: 6,
      center: {lat: 28.6139, lng: 77.2090}
    }
    map = new google.maps.Map(document.getElementById('map'), options);
}
function codeAddress(address) {
    geocoder.geocode({'address': address }, function (results, status) {
        latLng = {lat: results[0].geometry.location.lat (), lng: results[0].geometry.location.lng ()};
        if (status === 'OK') {
            // console.log(latLng);
            marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
            map.setZoom(7);
            map.panTo(latLng);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}