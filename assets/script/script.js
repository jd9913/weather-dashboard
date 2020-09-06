
//API Information
const apiKey = "f8b4e4e676da7a6f6b5d39dca6a31195";
const apiBaseURL = "https://api.openweathermap.org/data/2.5/weather?q="//for using city name as parameter
const baseUVData = "https://api.openweathermap.org/data/2.5/onecall?";
const iconURLBase = "https://openweathermap.org/img/wn/";


//search box elements
const searchBoxEl = document.querySelector('#search-box');
const searchFormEl = document.querySelector('#search-form');
const cityNameEl = document.querySelector('#location');

//current weather display elements
const writeCityEl = document.querySelector('#w-city');//search-term
const writeIconEl = document.querySelector('#w-icon');
const writeForecastWxEl = document.querySelector('#w-forecast-cards');//container
const writeTempEl = document.querySelector('#w-temp');
const writeHumEl = document.querySelector('#w-humidity');
const writeWindEl = document.querySelector('#w-wind');
const writeCurrentWXEl = document.querySelector('#currentData');
const writeUVIndexEl = document.querySelector("#w-uvi");
const forecastDateEl = document.querySelector('#f-date');
let cityName = cityNameEl.value;



//forecast cards display elements
const initCard = document.querySelector('#w-forecast-cards');
const fDateEl = document.querySelector('#f-date');
const fIconEl = document.querySelector('#f-icon');
const fTempMinEl = document.querySelector('#f-tempMin');
const fTempMaxEl = document.querySelector('#f-tempMax');
const fhumidEl = document.querySelector('#f-humidity');




let i = 0;



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




        })
        .then(function (response) {


            if (response.length === 0) {
                console.log('data not found');
            } else {



                displayWeather(response);
                colorUvi(response);



                let unixDate = response.daily[i].dt;


                forecastCards(response, unixDate);

            }

        })

};


//display the current weather on the page

let displayWeather = function (response) {


    //write current weather based on API results
    writeTempEl.innerHTML = ('Current Temperature: ' + response.current.temp + 'F');
    writeHumEl.innerHTML = ('Current Humidity: ' + response.current.humidity + '%');
    writeWindEl.innerHTML = ('Current Wind Speed: ' + response.current.wind_speed + ' MPH');

    writeUVIndexEl.innerHTML = response.current.uvi;


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


//create the cards to hold the forecast data

function createCard() {

    let tempNode = document.createTextNode("")

    const fCard = document.createElement('div');
    fCard.newClass = ("card");
    initCard.appendChild(fCard);

    const fCardBody = document.createElement('div');
    fCardBody.newClass = ("card-body");
    fCard.appendChild(fCardBody);

    const fCardTitle = document.createElement('div');
    fCardTitle.newClass = ("card-title");
    fCardTitle.appendChild(tempNode);
    fCardBody.appendChild(fCardTitle);

    const fCardSubTitle = document.createElement('div');
    fCardSubTitle.newClass = ("card-subtitle mb-2 text-muted");
    fCardSubTitle.appendChild(tempNode);
    fCardBody.appendChild(fCardTitle);

    const fCardText = document.createElement('div');
    fCardText.newClass = ('card-text');
    fCardBody.appendChild(fCardText);

    const fCardList = document.createElement('ul');
    fCardList.newClass = ('list-group');
    fCardText.appendChild(fCardList);


    for (i = 0; i < 3; i++) {

        const fCardItem = document.createElement('li');
        fCardItem.newClass = ('list-group-item');
        fCardItem.appendChild(tempNode);
        fCardList.appendChild(fCardItem);
    }

}



let forecastCards = function (response, unixDate) {
    console.log(response);
    console.log(unixDate);
    let iconCode = response.daily[i].weather[0].icon;
    console.log(iconCode);
    let fIcon = iconURLBase + iconCode + ".png";
    console.log(fIcon);
    let ftempMin = response.daily[i].temp.day;
    let ftempMax = response.daily[i].temp.max;
    let fhumidity = response.daily[i].humidity;
    console.log('min= ' + ftempMin, 'max= ' + ftempMax, 'hum= ' + fhumidity)
    fDateEl.innerHTML = moment.unix(unixDate).format("MM/DD/YYYY");
    fIconEl.src = fIcon;
    fTempMinEl.innerHTML = ('Low: ' + ftempMin+'F');
    fTempMaxEl.innerHTML = ('High: ' + ftempMax+'F');
    fhumidEl.innerHTML = ('Humidity: ' + fhumidity+'%');
};




//submit the user provided search term
$('#search-btn').on('click', function () {
    event.preventDefault();
    searchFormSubmit();
});

