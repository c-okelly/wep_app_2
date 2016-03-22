var prompter = function () {
//    var text = $('#wheather_form').find('input[name="units"]').val();
    var location = document.getElementsByName("location")[0].value;
    
    var units = document.getElementsByName("units")[0].value;
    window.alert("location " + location + units );
    
//    window.alert(text);
};

