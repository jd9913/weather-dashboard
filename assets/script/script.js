



/*const callWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude = { part } & appid={ f8b4e4e676da7a6f6b5d39dca6a31195 }";*/


//weather class initialization

const weather = new Weather('phoenix', 'AZ');


weather.getWeather()

.then(results => {
    console.log(results);
})
    .catch(err => console.log(err));





