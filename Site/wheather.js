$(document).ready(function () {
    $('#wheather_form').submit(function () {
    call_api_load_map();
    return false;
});
});

var call_api_load_map = function() {
    var search_city = $("input[name=location]").val();
    var country_code = $("#country_code option:selected").val();
    var units = $("input[name=units]:checked").val();
    var no_days = $("input[name=no_days]:checked").val();    
    var url_start = "http://api.openweathermap.org/data/2.5/forecast?q="
    var api_key = "3a63ff88497e73a0dd39208e8e969b5e";
    
    var search_url = url_start + search_city + "," + country_code + "&mode=json&appid=" + api_key + "&units=" + units;
//    "http://api.openweathermap.org/data/2.5/forecast/daily?q= Dublin,IE &mode=json&appid= 3a63ff88497e73a0dd39208e8e969b5e &units= metric &cnt=5%22";
    
    var json = return_json_object(search_url);
    
    build_google_maps(json);
    
    
    
};

var build_google_maps = function(json_file){
    console.log(json);
;}

//
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