//Open Weather API URL: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
const apiKey = "f8b4e4e676da7a6f6b5d39dca6a31195";
const apiBaseURL = "https://api.openweathermap.org/data/2.5/weather?q="//for using city name as parameter
const baseUVData = "https://api.openweathermap.org/data/2.5/onecall?";
const iconURLBase = "http://openweathermap.org/img/w/";
const searchBoxEl = document.querySelector('#search-box');
const searchFormEl = document.querySelector('#search-form');
const cityNameEl = document.querySelector('#location');
const writeCityEl = document.querySelector('#w-city');//search-term
const writeIconEl = document.querySelector('#w-icon');
const writeForecastWxEl = document.querySelector('#w-forecast-cards');//container
const writeTempEl = document.querySelector('#w-temp');
const writeHumEl = document.querySelector('#w-humidity');
const writeWindEl = document.querySelector('#w-wind');
const writeCurrentWXEl = document.querySelector('#currentData');
const writeUVIndexEl = document.querySelector("#w-uvi");

let cityName = cityNameEl.value



//use the search term to populate the variable for the API call
let searchFormSubmit = function (event) {
    let cityName = cityNameEl.value.trim();
    if (cityName) {
        getWeatherData(cityName);
        // writeCurrentWxEl.textContent = "";
        cityNameEl.value = "";
    } else {
        alert("Please enter the name of a city");
        return;
    }
};
//api call for getting weather data
let getWeatherData = function (cityName) {
    let apiURL = apiBaseURL + cityName + '&units=imperial&appid=' + apiKey;




    fetch(apiURL)
        .then(function (response) {
            return response.json();



        })

        .then(function (response) {

            let iconCode = response.weather[0].icon;
            let fullIconURL = iconURLBase + iconCode + ".png";
            console.log(iconCode);
            writeCityEl.innerHTML = (cityName + "   " + moment().format('MM/DD/YYYY'));
            writeIconEl.src = fullIconURL;

            const exclusions = ('minutely,hourly');

            const latitude = response.coord.lat;
            const longitude = response.coord.lon;

            console.log(latitude);
            console.log(longitude);
            console.log(fullIconURL);

            let AllWxData = baseUVData + 'lat=' + latitude + '&lon=' + longitude + '&exclude=' + exclusions + '&appid=' + apiKey;



            console.log(AllWxData);


            return fetch(AllWxData);
        })
        .then(function (response, cityName) {
            return response.json();
        })
        .then(function (response, cityName) {


            if (response.length === 0) {
                console.log('data not found');
            } else {




                displayWeather(response, cityName);
            }

        })
};

let displayWeather = function (data, cityName) {





    //write current weather based on API results
    writeTempEl.innerHTML = ('Current Temperature: ' + data.current.temp);
    writeHumEl.innerHTML = ('Current Humidity: ' + data.current.humidity + '%');
    writeWindEl.innerHTML = ('Current Wind Speed: ' + data.current.wind_speed + ' MPH');

    writeUVIndexEl.innerHTML = ("Current UV Index: ") + data.current.uvi;

    console.log(writeUVIndexEl);

}
//submit the user provided search term
$('#search-btn').on('click', function () {
    event.preventDefault();
    searchFormSubmit();
});

