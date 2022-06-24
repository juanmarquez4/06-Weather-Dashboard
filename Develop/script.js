var APIKey = "2ae0cb6ae56672834d0091b96e80c99d";
var city = "sydney";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

function getApi(){

    fetch(queryURL)
        .then(function(response){
        console.log(response)
        return response.json();
        })
        .then(function(data){
        console.log(data)
        })
}

getApi();
