//Open Weather API URL: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}


const apiKey = "f8b4e4e676da7a6f6b5d39dca6a31195";
const apiBaseURL ="https://api.openweathermap.org/data/2.5/weather?q="

const searchBoxEl = document.querySelector('#search-box');
const searchFormEl = document.querySelector('#search-form');
const cityNameEl = document.querySelector('#location');





//api call for getting weather data
let getWeatherData = function () {

    let cityName = cityNameEl.value.trim();

    let apiURL = apiBaseURL + cityName + '&appid=' + apiKey;
    console.log(apiURL);

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(cityName);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });


};

$('#search-btn').on('click', function () {
    event.preventDefault();
    searchFormSubmit();
});


let searchFormSubmit = function (event) {

   let cityName = cityNameEl.value.trim();

    if (cityName) {
        getWeatherData(cityName);

    } else {
        alert("Please enter the name of a city");
        return;
    }
};




