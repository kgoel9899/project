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
var temparr = [];
var tot;
var prev = 0;
var LatLngList = new Array ();
var bounds;
var loc;
var tim = 0;
var x = 1;
var every = "";
var final = [];
var sorrtt = [];
var obj;
var obj1;
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
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
    var i = 0;
    var total = setInterval(function() {
        console.log(arr[i]);
        codeAddress(arr[i]);
        i++;
        if(i == arr.length) {
            arr = [];
            clearInterval(total);
        }
    }, 2000);
}
function codeAddress(address) {
    document.getElementById("br1").style.display = "block";
    document.getElementById("disp").style.display = "block";
    geocoder.geocode({'address': address }, function (results, status) {
        latLng = {lat: results[0].geometry.location.lat (), lng: results[0].geometry.location.lng ()};
        loc = new google.maps.LatLng(latLng.lat, latLng.lng);
        obj = {
            lat: latLng.lat,
            lng: latLng.lng,
            addr: address
        };
        sorrtt.push(obj);
        bounds.extend(loc);
        if (status === 'OK') {
            marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null); 
            }, 700);
            map.setZoom(15);
            map.panTo(latLng);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    document.getElementById("disp").innerHTML = 
        "<strong>" + "Current Address: " + "</strong>" + address;
}
function codeAddress1(address) {
    document.getElementById("br1").style.display = "block";
    document.getElementById("disp").style.display = "block";
    geocoder.geocode({'address': address }, function (results, status) {
        latLng = {lat: results[0].geometry.location.lat (), lng: results[0].geometry.location.lng ()};
        if (status === 'OK') {
            marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            });
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null); 
            }, 700);
            map.setZoom(15);
            map.panTo(latLng);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    document.getElementById("disp").innerHTML = 
        "<strong>" + "Current Address: " + "</strong>" + address;
}
function resett() {
    initMap();
    document.getElementById("disp").style.display = "none";
    document.getElementById("br1").style.display = "none";
}
function allprev() {
    prev = prev + 1;
    tot = document.getElementsByClassName("dispcheck");
    if(prev % 2 === 0) {
        for(var i=0;i<tot.length;i++) {
            tot[i].style.display = "none";
            tot[i].checked = false;
        }
        document.getElementById("dynamic").innerHTML = "Click to enable multiple selections";
    } else {
        for(var i=0;i<tot.length;i++) {
            tot[i].style.display = "block";
        }
        document.getElementById("dynamic").innerHTML = "Click to disable multiple selections";
    }
}
function addd(address) {
    if(document.getElementById(address).childNodes[0].checked === true) {
        arr.push(address);
        temparr.push(address);
    } else {
        var i = 0;
        for(;i<arr.length;i++) {
            if(arr[i] === address) {
                break;
            }
        }
        arr.splice(i, 1);
        temparr.splice(i, 1);
    }
}
function alll() {
    if(document.getElementById("dynamic").innerHTML === "Click to enable multiple selections") {
        alert("First click on the adjacent button");
    } else {
        if(arr.length === 0) {
            alert("First select some");
        } else {
            document.getElementById("dynamic").innerHTML = "Click to enable multiple selections";
            for(var i=0;i<tot.length;i++) {
                tot[i].style.display = "none";
                tot[i].checked = false;
            }
            prev = prev + 1;
            bounds = new google.maps.LatLngBounds ();
            check();
            tim = (arr.length + 1) * 2000;
            const printt = async (tim) => {
                await sleep(tim)
                map.fitBounds(bounds);
                map.panToBounds(bounds);
                x = 1;
                for(var i=0;i<sorrtt.length-1;i++) {
                    for(var j=0;j<sorrtt.length-i-1;j++) {  
                        if(sorrtt[j].lng > sorrtt[j+1].lng) {
                            obj1 = sorrtt[j];
                            sorrtt[j] = sorrtt[j + 1];
                            sorrtt[j + 1] = obj1;
                        }
                    }
                }
                for(var i=0;i<sorrtt.length;i++) {
                    if(i === temparr.length - 1) {
                        every = every + "<strong>" + x + ". " + "</strong>" + sorrtt[i].addr;
                    } else {
                        every = every + "<strong>" + x + ". " + "</strong>" + sorrtt[i].addr + "~";
                    }
                    x = x + 1;
                }
                final = every.split("~");
                document.getElementById("disp").innerHTML = "";
                document.getElementById("disp").innerHTML = 
                "<strong>" + "Addresses on the map for current selection from left to right: " + "</strong>" +
                "<br>" +
                final.join("<br>");
                temparr = [];
                final = [];
                every = "";
                sorrtt = [];
            }
            printt(tim);
        }
    }
}