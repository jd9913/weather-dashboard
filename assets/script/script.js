
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
/*const fDateEl = document.querySelector('#f-date');
const fIconEl = document.querySelector('#f-icon');
const fTempMinEl = document.querySelector('#f-tempMin');
const fTempMaxEl = document.querySelector('#f-tempMax');
const fhumidEl = document.querySelector('#f-humidity');*/




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
                let fDate = moment.unix(unixDate).format("MM/DD/YYYY");


                displayForecast(response, fDate);

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



function displayForecast(response, fDate) {

    for (i = 1; i < 6; i++) {

       // debugger;

        console.log(response);
        console.log(fDate);


       let forecastDate=moment(fDate).add((i), 'd').format('M/D/YYYY')


        //get weather data
        let iconCode = response.daily[i].weather[0].icon;
        console.log(iconCode);
        let fIcon = iconURLBase + iconCode + ".png";

        console.log(fIcon);
        let ftempMin = response.daily[i].temp.day;
        let ftempMax = response.daily[i].temp.max;
        let fhumidity = response.daily[i].humidity;
        console.log('min= ' + ftempMin, 'max= ' + ftempMax, 'hum= ' + fhumidity)


        //create card

        let fCard = $('<div>').attr('id', 'card' + i).attr('class', 'card border-dark mb-3');
        $('#w-forecast-cards').append(fCard);

        let fCardBody = $('<div>').attr('class', 'card-body');
        fCard.append(fCardBody);

        let cardTitle = $('<h5>').attr('class', 'card-title').text(forecastDate);
        fCardBody.append(cardTitle);

        let iconImage = $('<img>').attr('src', fIcon);
        fCardBody.append(iconImage);

        let fCardText = $('<div>').attr('class', 'card-text');
        fCardBody.append(fCardText);

        let fCardList = $('<ul>').attr('class', 'list-group');
        fCardText.append(fCardList);

        let lowTempItem = $('<li>').attr('class', 'list-group-item').text('Low: '+ ftempMin+'F');
        fCardList.append(lowTempItem);

        let highTempItem = $('<li>').attr('class', 'list-group-item').text('High: ' + ftempMax + 'F');
        fCardList.append(highTempItem);

        let fhumid = $('<li>').attr('class', 'list-group-item').text('Humidity: ' + fhumidity + '%');
        fCardList.append(fhumid);







    }


};




//submit the user provided search term
$('#search-btn').on('click', function () {
    event.preventDefault();
   // cityNameEl.reset();
    searchFormSubmit();
});

