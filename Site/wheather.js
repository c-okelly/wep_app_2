$(document).ready(function () {
    $(".sub_button").click(function () {
    // Call function to reload map and out put API data to page
    call_api_load_map();
    // Stops page reloading.
    return false;
    });
    google.maps.event.addDomListener(window, 'load', init);
    // Load and unload info depending on check boxes
});

// Based of the Google maps Api documentation
// Load first map for screen
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  };


// Based of the Google maps Api documentation
// Load autocomplete search bar to find places.
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

// Main function to load data.

var call_api_load_map = function() {
    var lat = $("input[id=lat]").val();
    var long = $("input[id=long]").val();
//    console.log(long, lat);
    var units = $("input[name=units]:checked").val();
    var no_days = $("input[name=no_days]:checked").val();    
    var url_start = "http://api.openweathermap.org/data/2.5/forecast?"
    var api_key = "3a63ff88497e73a0dd39208e8e969b5e";
    
    // Create search term
    var search_url = url_start + "lat=" + lat + "&lon=" + long  + "&mode=json&appid=" + api_key + "&units=" + units + "&cnt=" + no_days;
    
    http://api.openweathermap.org/data/2.5/forecast? lat=53.3499&lon=-6.267 &mode=json&appid=3a63ff88497e73a0dd39208e8e969b5e&units=metric&cnt=1
    
    // Created and update new maps
    new google.maps.Map(document.getElementById('map'), {center: {lat: parseFloat(lat), lng: parseFloat(long)},zoom: 9});
    
    // Make Json file call and create data output.
    $.getJSON(search_url, function(data) {
        var json = data;
        
        console.log(json);
//        var no_days = no_days;
        
        for (day=0;day<no_days;day++){
        // Start of dynamic filler.
        
        // Set all units
        // Set temp unit
        var temp_symbol;
        if (units === "Metric") {temp_symbol = "C";} 
        else {temp_symbol = "F"}
   
        
        // Basic units
        var day_no = day + 1;
        var wheather_discription = json.list[day].weather[0].description;
        var icon_no = json.list[day].weather[0].icon;
        var min_temp = json.list[day].main.temp_min;
        var max_temp = json.list[day].main.temp_max;
        var predicited_rain = 1;
        var pressure = json.list[day].main.pressure;
        var humidity = json.list[day].main.humidity;
        var wind_speed = json.list[day].wind.speed;

        var rain;
        try {
            rain = json.list[0].rain["3h"];
            }
        catch(eer){
            rain = "0"
        }
        
        var text_input = "<div class='row'> \
                                <div class='six columns'> \
                                   <p> Wheather for Day "+day_no+".<br> \
                                    The wheather today is "+wheather_discription+". <br> <br> \
                                    The wheather icon for the day is <br>  \
                                       <img src='http://openweathermap.org/img/w/"+icon_no+".png'>  \
                                    \
                                    </p> \
                                </div> \
                                <div class='six columns'> \
                                    <table class='lined'>  \
                                        <tr> \
                                            <td style='min-width:200px'>Wheather information</td> \
                                            <td style='min-width:80px'></td> \
                                        </tr> \
                                        <tr> \
                                            <td>Max Tempature</td>  \
                                            <td> "+max_temp+temp_symbol+" </td>  \
                                        </tr> \
                                        <tr>  \
                                            <td>Min Tempature</td>  \
                                            <td> "+min_temp+temp_symbol+" </td>  \
                                        </tr> \
                                        <tr> \
                                            <td>Predicited Rain fall</td>  \
                                            <td> "+rain+"mm </td>  \
                                        </tr> \
                                         <tr> \
                                            <td>Pressure</td> \
                                            <td> "+pressure+" </td> \
                                        </tr> \
                                         <tr> \
                                            <td>Humidity</td> \
                                            <td> "+humidity+" </td> \
                                        </tr> \
                                         <tr> \
                                            <td>Wind Speed</td>  \
                                            <td> "+wind_speed+" </td> \
                                        </tr> \
                                    </table> \
                                </div> \
                            </div> <br><br>";
        
        //Javascript loop to go through all relevent days
//        $("#day_1").empty();
        $("#forecast").append(text_input);
        ;}
        
        
        ;})  
};

