var jquery = document.createElement("script");
jquery.setAttribute("src", "https://code.jquery.com/jquery-3.3.1.js");
jquery.setAttribute("integrity", "sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=");
jquery.setAttribute("crossorigin", "anonymous");
document.head.appendChild(jquery);
var address;
var geocoder;
var map;
var marker;
var latLng;
var options;
var arr = [];
var i;
var flag;
initMap();
function initMap() {
    geocoder = new google.maps.Geocoder();
    options = {
      zoom: 6,
      center: {lat: 28.6139, lng: 77.2090},
      gestureHandling: 'cooperative'
    }
    map = new google.maps.Map(document.getElementById('map'), options);
}
function check() {
    if(document.getElementById("group").checked === false) {
        i = 0;
        var total = setInterval(function() {
            codeAddress(arr[i]);
            i++;
            if(i == arr.length) {
                arr = [];
                clearInterval(total);
            }
        }, 2000);
    }
}
function addd(address) {
    if(document.getElementById("group").checked === true) {
        flag = 0;
        for(var i=0;i<arr.length;i++) {
            if(arr[i] === address) {
                flag = 1;
            }
        }
        if(flag === 0) {
            arr.push(address);
        }
    } else {
        codeAddress(address);
        arr = [];
    }
}
function codeAddress(address) {
    document.getElementById("br1").style.display = "block";
    document.getElementById("disp").style.display = "block";
    geocoder.geocode({'address': address }, function (results, status) {
        latLng = {lat: results[0].geometry.location.lat (), lng: results[0].geometry.location.lng ()};
        if (status === 'OK') {
            marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
            map.setZoom(15);
            map.panTo(latLng);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    document.getElementById("disp").innerHTML = 
        "<strong>" + "Current Address: " + "</strong>" + address;
    console.log(address);
}
function resett() {
    initMap();
    document.getElementById("disp").style.display = "none";
}