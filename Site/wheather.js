$(document).ready(function () {
    var lat1;
    var lng1;
    google.maps.event.addDomListener(window, 'load', init);
    $(".sub_button").click(function () {
    call_api_load_map();
    return false;
});
});

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  };    

function init() {
    var input = document.getElementById('locationTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        lat1 = place.geometry.location.lat();
        lng1 = place.geometry.location.lng();
//        console.log(lat1,lng1);
        document.getElementById("lat").value=lat1;
        document.getElementById("long").value=lng1;
   }
);
}



var call_api_load_map = function() {
    var lat = $("input[id=lat]").val();
    var long = $("input[id=long]").val();
    console.log(long, lat);
    var units = "metric" //$("input[name=units]:checked").val();
    var no_days = $("input[name=no_days]:checked").val();    
    var url_start = "http://api.openweathermap.org/data/2.5/forecast?"
    var api_key = "3a63ff88497e73a0dd39208e8e969b5e";
    
    var search_url = url_start + "lat=" + lat + "&lon=" + long  + "&mode=json&appid=" + api_key + "&units=" + units + "&cnt=1" // + no_days;
    
    http://api.openweathermap.org/data/2.5/forecast? lat=53.3499&lon=-6.267 &mode=json&appid=3a63ff88497e73a0dd39208e8e969b5e&units=metric&cnt=1
    
    new google.maps.Map(document.getElementById('map'), {center: {lat: parseFloat(lat), lng: parseFloat(long)},zoom: 9});
    
    $.getJSON(search_url, function(data) {
        var json = data;
        var city_lat = json.city.coord.lat;
        var city_long = json.city.coord.lon;
        var map;
//        new google.maps.Map(document.getElementById('map'), {center: {lat: city_lat, lng: city_long},zoom: 9});
        console.log(json);
        ;})
//    
//    var city_name = json.city.name;
//    
//    var city_lat = json.city.coord.lat;
//    var city_long = json.city.coord.lon;
//    console.log(json.city.coord);
//    var map;
//    new google.maps.Map(document.getElementById('map'), {center: {lat: city_lat, lng: city_long},zoom: 9});    
//
//    
};


var return_json_object = function(search_url) {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': search_url,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
//    console.log(json);
    return json;
};