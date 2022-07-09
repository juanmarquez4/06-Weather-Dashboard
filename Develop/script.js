let inputBtn = $("#btn");
let currentCard = $("#currentCard");
let futureCard = $("#futureCard");

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
        return response.json();
        })
        .then(function(data){
            let lon = data.coord.lon;
            let lat = data.coord.lat;
    
        // second API call to get current and future conditions
        let queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=alerts,minutely,hourly&units=metric&appid=" + APIKey;

        fetch(queryURL2)
            .then(function(response){
            return response.json();
            })
            .then(function(data){
            console.log(data)
            
            // resets current card content
            currentCard.empty()

            // Current Conditions
            let cityName = city;
            let icon = data.current.weather[0].icon;
            let temperature = data.current.temp;
            let wind = data.current.wind_speed;
            let humidity = data.current.humidity;
            let uvi = data.current.uvi;
    
            let currentWeather = 
                `
                <div class="card col-2 p-3">
                <h5 class="card-title">${cityName} <img src="http://openweathermap.org/img/wn/${icon}@2x.png"></h5>
                <h6 class="card-text">Temp: ${temperature} °C</h6>
                <h6 class="card-text">Wind: ${wind} m/s</h6>
                <h6 class="card-text">Humidity: ${humidity} %</h6>
                <h6 class="card-text">UV Index: ${uvi}</h6>
                </div>
                `
            currentCard.append(currentWeather);

            // resets current card content
            futureCard.empty()

            // Future Conditions 
            for(let i=0; i<5;i++){

                let iconDaily = data.daily[i].weather[0].icon;
                let temperatureDaily = data.daily[i].temp.day;
                let windDaily = data.daily[i].wind_speed;
                let humidityDaily = data.daily[i].humidity;
                let uviDaily = data.daily[i].uvi;
    
                let futureWeather =
                `
                    <div class="col-2 card me-3 p-3">
                    <h5 class="card-title">${cityName} <img src="http://openweathermap.org/img/wn/${iconDaily}@2x.png"></h5>
                    <h6 class="card-text">Temp: ${temperatureDaily} °C</h6>
                    <h6 class="card-text">Wind: ${windDaily} m/s</h6>
                    <h6 class="card-text">Humidity: ${humidityDaily} %</h6>
                    <h6 class="card-text">UV Index: ${uviDaily}</h6>
                    </div>
                    `
                futureCard.append(futureWeather);

            }
            });
        });
}


