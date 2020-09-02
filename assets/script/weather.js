/*Open Weather API URL: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&
exclude = { part } & appid={YOUR API KEY}*/
//Open Weather API Key:ca33c4ea10ee4b2a98d215600200209

let geoOptions = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0,
}


const apiKey = "ca33c4ea10ee4b2a98d215600200209";


class Weather {
    constructor(city, state) {
        this.apiKey,
            this.city,
            this.state
     };

    //get weather data from API

    async getWeather() {
        const response = fetch(`http://api.weatherapi.com/v1/current.json?key=ca33c4ea10ee4b2a98d215600200209&q=${this.city}&${this.state} `)
            .then((response) => {
                return responseData.coord.lon;
                return responseData.coord.lat;
                return responseData.weather.main;
                return responseData.wind;
                return responseData.weather.icon;
                console.log(responseData);
            })

            .catch((err) => {
                console.log('unable to complete request');
            })


    }





    //change weather location
    changeLocation(city, state) {
        this.city = city;
        this.state = state;


    }

}










