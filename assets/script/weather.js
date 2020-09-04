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
const writeUVIndexEl = document.querySelector("w-uv");


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
    //console.log(apiURL);

    writeCityEl.innerHTML = cityName;

  //  console.log(writeCityEl);
   // console.dir(writeCityEl);

    fetch(apiURL)
        .then(function (response) {

            if (response.ok) {
                //console.log(response);

                response.json().then(function (data) {

                    console.log(data);

                    displayWeather(data, cityName);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert('unable to connect to API service');
        });

};



let displayWeather = function (data, cityName) {


    let iconCode = data.weather[0].icon;
    let fullIconURL = iconURLBase + iconCode + ".png";

    writeCityEl.innerHTML = cityName;

    console.log(data);

    cityName = data.name;

    writeCityEl.innerHTML= (cityName + "   " + moment().format('MM/DD/YYYY'));
    writeIconEl.src = fullIconURL;


    //write current weather based on API results

    writeTempEl.innerHTML = ('Current Temperature: ' + data.main.temp);
    writeHumEl.innerHTML = ('Current Humidity: ' + data.main.humidity + '%');
    writeWindEl.innerHTML = ('Current Wind Speed: ' + data.wind.speed + 'MPH');


    const latitude = data.coord.lat;
    const longitude = data.coord.lon;


    const dataUV = (baseUVData+'lat='+latitude+'&lon='+longitude+'&exclude=minutely,hourly,daily&appid='+apiKey);

    fetch(dataUV)
        .then(function (response) {

            if (response.ok) {
                //console.log(response);

                response.json().then(function (dataUV) {

                    console.log(dataUV);

                    writeUVIndexEl.innerHTML = dataUV.current.uvi;
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert('unable to connect to API service');
        });



    console.log(cityName);
    console.log(data);



}





//submit the user provided search term

$('#search-btn').on('click', function () {
    event.preventDefault();
    searchFormSubmit();
});