$(document).ready(function() {
    window.alert("Hello!");
    var json_file;
//    json = call_api();
//    json_file = call_3();
//    console.log(json_file);
//    $(".test").append(json_file.city.name);
    
});



var call_api_load_map = function() {
    var search_city = $("input[name=location]").val();
    var country_code = $("#country_code option:selected").val();
    var units = $("input[name=units]:checked").val();
    var no_days = $("input[name=no_days]:checked").val();    
    var url_start = "http://api.openweathermap.org/data/2.5/forecast?q="
    var api_key = "3a63ff88497e73a0dd39208e8e969b5e";
    
    var search_url = url_start + search_city + "," + country_code + "&mode=json&appid=" + api_key + "&units=" + units
    
    "http://api.openweathermap.org/data/2.5/forecast/daily?q= Dublin,IE &mode=json&appid= 3a63ff88497e73a0dd39208e8e969b5e &units= metric &cnt=5%22"
    
    alert(search_url);
    
};

var print = function() {
    alert("hello");
}


var call_2 = function () {
    var file = $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?lat=53.3498053&lon=-6.260309699999993&mode=json&appid=3a63ff88497e73a0dd39208e8e969b5e&units=metric&cnt=5", function(data) {
        json_file = JSON.parse(data);
        console.log(json_file);
    });
};

var call_3 = function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "http://api.openweathermap.org/data/2.5/forecast/daily?lat=53.3498053&lon=-6.260309699999993&mode=json&appid=3a63ff88497e73a0dd39208e8e969b5e&units=metric&cnt=5",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
};