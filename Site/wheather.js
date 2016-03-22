$(document).ready(function() {
//    window.alert("Hello!");
    var json_file;
//    json = call_api();
    json_file = call_3();
    console.log(json_file);
    $(".test").append(json_file.city.name);
    
});

var call_api = function() {var json_file =
$.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?lat=53.3498053&lon=-6.260309699999993&mode=json&appid=3a63ff88497e73a0dd39208e8e969b5e&units=metric&cnt=5", function(json) {
//    console.log(json);
    console.log(json.city.id);
});
return json_file;
};


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