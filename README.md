This file contains the readme for my Web-app Assighment number 2

Name Conor O'Kelly.

All of the basic requirement of the task where meet. I have used a number of different api to enhance my overall project.

I have split my Javascript code into a number of functions and tried to provided effective comments throughout.

Points of note.
For a lot of this project I have elected to use jquery when it is easier.
I have been unable to combine both the map and search bar api request into a single request so this seem to throw an error.

I have not used html forms to hold my submssion form and instead used a jqeury listener that activate when the submit button is clicked. The main reason was that I could not disable the submit on enter behaviour of the form. This was  causing issues.

To avoid errors where users might enter location that did not exist I have used a google maps search bar from their API collection. This bar automatically generate locations based on the user input. When the user selects a location the latitude and longitude of the location are loaded into the html page. This is then used as part of the open weather request.

I have decided to use two different API keys. This was due to issues being created by submitted a request for 5 days forecast and requesting an extended forecast very shortly after.

Jquery json request do not have any inbuilt error catching. To account for this I created a variable that that starts off as false. If the json request is successful this is changed true. I then use a setTimeout function to wait 2 seconds and then check the status of the json request. On error this will alert the user to which if any of the requests has failed.

The 24 hour forecast request only loads the relevant periods for the first day. This also uses the correctly formated html / css to make the tables align properly.


