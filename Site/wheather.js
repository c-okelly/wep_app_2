$(document).ready(function () {
    $(".sub_button").click(function () {
    // Call function to reload map and out put API data to page
//    call_api_load_map();
        
        // Verify that all item have been fileld in.
        if (($("input[name=units]:checked").val()) != undefined) {
            // Clear forcast of any previos result
            $("#forecast").empty();
            call_api_load_map();
                                                                 } else {
                                                                  alert("Pleae fill out the whole form");   
                                                                 }
        
    // Stops page reloading.
    return false;
    });
    // Init search bar
    google.maps.event.addDomListener(window, 'load', init);
    
    // Load and unload info depending on check boxes
    check_boxs();
    
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
        document.getElementById("lat").value=lat1;
        document.getElementById("long").value=lng1;
   }
);
}

// Main function to load data.
var call_api_load_map = function() {
    var lat = $("input[id=lat]").val();
    var long = $("input[id=long]").val();
    var units = $("input[name=units]:checked").val();
    var no_days = $("input[name=no_days]:checked").val();    
    var url_start = "http://api.openweathermap.org/data/2.5/forecast/daily?"; // To get daily data
    var url_start_3h = "http://api.openweathermap.org/data/2.5/forecast?";
    var api_key = "3a63ff88497e73a0dd39208e8e969b5e";
    
    // Create search term
    var search_url = url_start + "lat=" + lat + "&lon=" + long  + "&mode=json&appid=" + api_key + "&units=" + units + "&cnt=5"// + no_days;
    var serach_24_url = url_start_3h + "lat=" + lat + "&lon=" + long  + "&mode=json&appid=" + api_key + "&units=" + units;
    
    // Created and update new maps
    new google.maps.Map(document.getElementById('map'), {center: {lat: parseFloat(lat), lng: parseFloat(long)},zoom: 9});
    
    // Make Json file call and create data output.
    $.getJSON(search_url, function(data) {
        var json = data;
        
        
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
        // Get date from unix date 
        var o_date = new Date(json.list[day].dt *1000);
        var s_date = o_date.toString(); // Convert object to string 
        var date = s_date.substring(0,15)

        var icon_no = json.list[day].weather[0].icon;
        var min_temp = json.list[day].temp.min;
        var max_temp = json.list[day].temp.max;
        var pressure = json.list[day].pressure;
        var humidity = json.list[day].humidity;
        var wind_speed = json.list[day].speed;

        var rain = json.list[day].rain;
        if (rain === undefined) {rain = "0"};
        
        var text_input = inset_main_information(day_no,date,wheather_discription,icon_no,max_temp,min_temp,temp_symbol,rain,pressure,humidity,wind_speed);
        
        
        //Javascript loop to go through all relevent days
        $("#forecast").append(text_input);
            ;}
        ;})  
    
    // Jason call for wheather every three hours
     $.getJSON(serach_24_url, function(data) {
        var json_24 = data;
         console.log(json_24);
         // Set timeout user to prevent 429 error from open wheahter api
         setTimeout(function() {tweenty_four_hours(json_24,no_days);},2000)
     });
    
    // Two loops to create and insert the data
    
};

// Load main text into page
var inset_main_information = function (day_no,date,wheather_discription,icon_no,max_temp,min_temp,temp_symbol,rain,pressure,humidity,wind_speed) {
    var text_input = "<div class='forecast_for_day_"+day_no+"'><div class='row'> \
                                <div class='three columns offset-by-two'> \
                                   <p> Wheather for the<br> "+date+" is.<br> \
                                    The wheather today is "+wheather_discription+". <br> <br> \
                                    The wheather icon for the day is <br>  \
                                       <img src='http://openweathermap.org/img/w/"+icon_no+".png'>  \
                                    \
                                    </p> \
                                </div> \
                                <div class='three columns'> \
                                    <table class='lined'>  \
                                        <tr> \
                                            <td style='min-width:200px'>Wheather information</td> \
                                            <td style='min-width:80px'></td> \
                                        </tr> \
                                        <tr> \
                                            <td>Max Tempature</td>  \
                                            <td> "+max_temp+" "+temp_symbol+" </td>  \
                                        </tr> \
                                        <tr>  \
                                            <td>Min Tempature</td>  \
                                            <td> "+min_temp+" "+temp_symbol+" </td>  \
                                        </tr> \
                                        <tr> \
                                            <td>Predicited Rain fall</td>  \
                                            <td> "+rain+"mm </td>  \
                                        </tr> \
                                         <tr class='pressue_display'> \
                                            <td>Pressure</td> \
                                            <td> "+pressure+" </td> \
                                        </tr> \
                                         <tr class='humidity_display'> \
                                            <td>Humidity</td> \
                                            <td> "+humidity+"% </td> \
                                        </tr> \
                                         <tr class='wind_speed_display'> \
                                            <td>Wind Speed</td>  \
                                            <td> "+wind_speed+" </td> \
                                        </tr> \
                                    </table> \
                                </div> \
                            </div> </div><br>";
    return text_input;
}  

// Fucntions to turn relevant data on or off dependants on check boxes
var check_boxs = function() {
   $('.pressue').change(function () {
        if ($(this).attr("checked")) 
            {$('.pressue_display').fadeIn();}
        else {
            $('.pressue_display').fadeOut();
        }
    });
    $('.humidity').change(function () {
        if ($(this).attr("checked")) 
            {$('.humidity_display').fadeIn();}
        else {
            $('.humidity_display').fadeOut();
        }
    });
    $('.wind_speed').change(function () {
        if ($(this).attr("checked")) 
            {$('.wind_speed_display').fadeIn();}
        else {
            $('.wind_speed_display').fadeOut();
        }
    });

;}


//// Create 24 hours version with 3 hours forcasts for each day.
var tweenty_four_hours = function(json_object,no_days) {
    var first_time = json_object.list[0].dt_txt.substring(11,13);

    // Check how many items are to be in day 1. As tempature dependant.
    var day_1_items;
    switch (first_time) {
         case "03":
            day_1_items = 7;
            break;
         case "06":
            day_1_items = 6;
            break;
         case "09":
            day_1_items = 5;
            break;
         case "12":
            day_1_items = 4;
            break;
         case "15":
            day_1_items = 3;
            break;
         case "18":
            day_1_items = 2;
            break;
         case "21":
            day_1_items = 1;
            break;
        case "00":
            day_1_items = 0;
            break;
    }   
    
    // Create first day of forcasts
    day_1_forcasts = create_first_forecast_row(json_object,day_1_items);
    console.log(day_1_forcasts);
    
    day_2_forscast = create_gen_full_forcast_row(json_object,day_1_items,2);
    day_3_forscast = create_gen_full_forcast_row(json_object,day_1_items,3);
    day_4_forscast = create_gen_full_forcast_row(json_object,day_1_items,4);
    day_5_forscast = create_gen_full_forcast_row(json_object,day_1_items,5);
    
    
    // Append rows to their correct locations
    $(".forecast_for_day_1").append(day_1_forcasts);
    $(".forecast_for_day_2").append(day_2_forscast);
    $(".forecast_for_day_3").append(day_3_forscast);
    $(".forecast_for_day_4").append(day_4_forscast);
    $(".forecast_for_day_5").append(day_5_forscast);
    ;}

// Use json array from object to bulid general table in html ready to be inserted
var generate_single_table = function(json_array) {
    var rain = json_array.rain["3h"];
    if (rain === undefined) {rain = "0"};
    
    var text = "<table class='lined'> \
                                        <tr>  \
                                            <td style='min-width:120px;'>Wheather info at</td>  \
                                            <td style='min-width:60px'> "+json_array.dt_txt+"</td> \
                                        </tr> \
                                        <tr>  \
                                            <td>Wheather description</td>  \
                                            <td> "+json_array.weather[0].description+" </td>  \
                                        </tr> \
                                        <tr>  \
                                            <td>Wheather icon</td>  \
                                            <td> <img src='http://openweathermap.org/img/w/"+json_array.weather[0].icon+".png'> </td>  \
                                        </tr> \
                                        <tr>  \
                                            <td>Max Tempature</td>  \
                                            <td> "+json_array.main.temp_max+" </td>  \
                                        </tr> \
                                        <tr>  \
                                            <td>Min Tempature</td>  \
                                            <td> "+json_array.main.temp_min+" </td>  \
                                        </tr> \
                                        <tr>  \
                                            <td>Predicited rainfall</td>  \
                                            <td> "+rain+" </td>  \
                                        </tr> \
                                        <tr class='pressue_display'> \
                                            <td>Pressure</td> \
                                            <td> "+json_array.main.pressure+" </td> \
                                        </tr> \
                                         <tr class='humidity_display'> \
                                            <td>Humidity</td> \
                                            <td> "+json_array.main.humidity+"% </td> \
                                        </tr> \
                                         <tr class='wind_speed_display'> \
                                            <td>Wind Speed</td>  \
                                            <td> "+json_array.wind.speed+" </td> \
                                        </tr> \
                                    </table>"
    return text;
    
};

// Generate a full fow. Will generate dynamic and respoinse html
var generate_row_4 = function(json_object,start,finish) {
    // number of columns
    var no_columns;
    var range = (finish - start);
    switch (range){
        case 4:
            no_columns = "three";
            break;
        case 3:
            no_columns = "four";
            break;
        case 2:
            no_columns = "six";
            break;
        case 1:
            no_columns = "six offset-by-three";
            break;
    }
    
    var start_text = "<div class='row'>"; 
    var end_text =  "</div>";
    var middle_bit = "";
    
    var start_range = start;
    var end_range = finish;
    
    for (i=start_range;i<end_range;i++) {
        text = generate_single_table(json_object.list[i]);
        text = "<div class='"+no_columns+" columns'>" + text + "</div>";
        middle_bit = middle_bit + text;
    }
    var finisihed_row = (start_text + middle_bit + end_text);
    return finisihed_row;
;}

// Create first forecast row. Unique as is dynamially generated
var create_first_forecast_row = function(json_object,day_1_items){
    if (day_1_items >= 4) {
        var forcasts_on_second_row = (day_1_items % 4);
        var first_row = generate_row_4(json_object,0,4);
        var second_row = generate_row_4(json_object,4,forcasts_on_second_row);
        var both_row = first_row + second_row;
    } else {
        var both_row = generate_row_4(json_object,0,day_1_items);
    }
    // Statement if no results to shows as no more forecast are availibe for the day.
    var statement = "";
    if (day_1_items === 0) {statement = "Sorry. There are no more forcasts for the day as it is alreayd past 21:00";}
    // Add formating for to capture whole row in a class
    both_row = "<div class='day_1_extend_forcast, center'> 24 hour forcasts for day 1<br>" + statement + both_row + "<br></div>"
    return both_row;

;}

// Create a full day of 8 3 hours forcasta
var create_gen_full_forcast_row = function(json_object,first_day_no_forcastas,day_no){
    // Create generalised ragne point for day to be taken from
    var start_point = (((day_no-2) * 8)+first_day_no_forcastas);
    var row_1 = generate_row_4(json_object,start_point,(start_point+4))
    var row_2 = generate_row_4(json_object,(start_point+4),(start_point+8));
    
    var both_rows = "<div class='day_"+day_no+"_extend_forcast, center'> 24 hour Forecasts for day "+ day_no + row_1 + " <br>"+ row_2 +"</div>";
    
    return both_rows;
    ;}

var fade_on_click_for_24_hour_forcasta = function() {
    var x = 1;
    ;}