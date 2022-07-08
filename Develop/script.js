let inputBtn = $("#btn");
let currentCard = $("#currentCard");


inputBtn.click (function(){
    getApi();
})

// first API call to obtain lon and lat from searched city
function getApi(){

    let city = $("input").val();
    let APIKey = "2ae0cb6ae56672834d0091b96e80c99d";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function(response){
        console.log(response)
        return response.json();
        })
        .then(function(data){
            let lon = data.coord.lon;
            let lat = data.coord.lat;
    
        // second API call to get current and future conditions
        let queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=alerts,minutely,hourly&units=metric&appid=" + APIKey;

        fetch(queryURL2)
            .then(function(response){
            console.log(response)
            return response.json();
            })
            .then(function(data){
            console.log(data)
            
            // resets card content
            currentCard.empty()

            // Current Conditions
            let cityName = city;
            console.log(cityName);
            
            let icon = data.current.weather[0].icon;
            console.log(icon);
    
            let temperature = data.current.temp;
            console.log(temperature);

            let wind = data.current.wind_speed;
            console.log(wind);
    
            let humidity = data.current.humidity;
            console.log(humidity);
    
            let uvi = data.current.uvi;
            console.log(uvi);
    
            var currentWeather = 
                `
                <div class="card">
                <h5 class="card-title">${cityName} <img src="http://openweathermap.org/img/wn/${icon}@2x.png"></h5>
                <h6 class="card-text">Temp: ${temperature} °C</h6>
                <h6 class="card-text">Wind: ${wind} m/s</h6>
                <h6 class="card-text">Humidity: ${humidity} %</h6>
                <h6 class="card-text">UV Index: ${uvi}</h6>
                </div>
                `

            
            currentCard.append(currentWeather);
            
            });

        

        });

       
    
}


