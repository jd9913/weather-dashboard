//Open Weather API URL: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
const apiKey = "f8b4e4e676da7a6f6b5d39dca6a31195";
const apiBaseURL = "https://api.openweathermap.org/data/2.5/weather?q="//for using city name as parameter
const baseUVData = "https://api.openweathermap.org/data/2.5/onecall?";
const iconURLBase = "http://openweathermap.org/img/wn/";

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
const forecastDateEl = document.querySelector('#f-date');
const initCard = document.querySelector('#w-forecast-cards');

let cityName = cityNameEl.value;




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


            writeCityEl.innerHTML = (cityName + "   " + moment().format('MM/DD/YYYY'));
            writeIconEl.src = fullIconURL;



            const exclusions = ('minutely,hourly');

            const latitude = response.coord.lat;
            const longitude = response.coord.lon;

            console.log(latitude);
            console.log(longitude);


            let AllWxData = baseUVData + 'lat=' + latitude + '&lon=' + longitude + '&units=imperial' + '&exclude=' + exclusions + '&appid=' + apiKey;

            //console.log(AllWxData);


            return fetch(AllWxData);
        })
        .then(function (response) {
            return response.json();

            console.log(response);

        })
        .then(function (response) {


            if (response.length === 0) {
                console.log('data not found');
            } else {


                displayWeather(response);
                colorUvi(response);
               let unixDate = data.dt;

                forecastCards(response, unixDate);
            }

        })

};


//display the current weather on the page

let displayWeather = function (data) {


    //write current weather based on API results
    writeTempEl.innerHTML = ('Current Temperature: ' + data.current.temp + 'F');
    writeHumEl.innerHTML = ('Current Humidity: ' + data.current.humidity + '%');
    writeWindEl.innerHTML = ('Current Wind Speed: ' + data.current.wind_speed + ' MPH');

    writeUVIndexEl.innerHTML = data.current.uvi;



}



let colorUvi = function (response) {

    /*provides a background color to UV Index based on value.  Value limits found at: https://en.wikipedia.org/wiki/Ultraviolet_index#:~:text=A%20UV%20index%20reading%20of%206%20to%207%20means%20high,%2C%20and%20UV%2Dblocking%20sunglasses. */

    const uvIndex = response.current.uvi;

    //console.log(uvIndex);


    if (uvIndex > 10) {
        writeUVIndexEl.className = 'uvViolet';
    } else if (2 < uvIndex && uvIndex <= 5) {
        writeUVIndexEl.className = 'uvYellow';
    } else if (5 < uvIndex && uvIndex <= 7) {
        writeUVIndexEl.className = 'uvOrange';
    } else if (7 < uvIndex && uvIndex <= 10) {
        writeUVIndexEl.className = 'uvRed';
    } else {
        return writeUVIndexEl.className = 'uvGreen';
    }

    //console.dir(writeUVIndexEl);



    // console.log(writeUVIndexEl);

}

let forecastCards = function (response) {

    let i = 0;

   let data = response.daily;



    console.log(response);

    let unixDate = data[i].dt[i];
    let iconCode = data[i].weather[0].icon;
    let fIcon = iconURLBase + iconCode + ".png";
    let ftempMin = data[i].temp.day;
    let ftempMax = data[i].temp.max;
    let fhumidity = data[i].humidity;

    $('#f-date').text = (unixDate[i]);
    $('#f-icon').src = fIcon[i];
    $('#f-tempMin').text = ('min temp: ' + ftempMin[i]);
    $('f-tempMax').text = ('Max Temp: ' + ftempMax[i]);
    $('f-humidity').text = ('Humidity: ' + fhumidity[i]);

};



function createCard() {

    const fCard = $("<div>").attr({ "class": "card" });

    $(initCard).append(createCard());

    const fCardBody = $("<div>").attr({ "class": "card-body" });
    $(fCard).append(fCardBody);
    const fCardTitle = $("<div>").attr({ "class": "card-title" });
    $(fCardBody).append(fCardTitle);
    const fCardSTitle = $("<div>").attr({ "class": "card-subtitle mb-2 text-muted" });
    $(fCardTitle).append(fCardSTitle);
    const Icon = $("<img>").attr('src', "");
    $(fCardSTitle).append(Icon);
    const fCardText = $("<div>").attr({ "class": "card-text" });
    $(fCardSTitle).append(fCardText);
    const fcardLGrp = $("<ul>").attr({ "class": "card-group" });
    $(fCardText).append(fcardLGrp);
    let fCardLItm = $('<li>').attr({ "class": "card-item" });
    $(fcardLGrp).append(fCardLItm);
    let fCardLItm1 = $('<li>').attr({ "class": "card-item" });
    $(fcardLGrp).append(fCardLItm1);
    let fCardLItm2 = $('<li>').attr({ "class": "card-item" });
    $(fcardLGrp).append(fCardLItm2);

}




/*for (let i = 0; i < 5; i++) {
    createCard();
    $(initCard).append(createCard());
    //forecastCards();
}*/



//submit the user provided search term
$('#search-btn').on('click', function () {
    event.preventDefault();
    searchFormSubmit();
});

