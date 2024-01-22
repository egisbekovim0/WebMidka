const express = require('express');
const router = express.Router();
const https = require('https')

router.get('/', function(req, res){
    const query = req.query.city
    const ApiKey = '2cfe730f0d4e1da90e9ab48860bd6122'
    const unit = 'metric'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query + '&appid=' + ApiKey + '&units=' + unit

    https.get(url,function (response){
        console.log(res.statusCode)
        response.on('data', async function(data){
            const weatherData = JSON.parse(data)
            console.log(weatherData)
            const temp = weatherData.main.temp
            const feelLike = weatherData.main.feels_like
            const humid = weatherData.main.humidity
            const pressure = weatherData.main.pressure
            const windspeed = weatherData.wind.speed
            const countrCode = weatherData.cod
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
            
            const latitude = weatherData.coord.lat;
            const longitude = weatherData.coord.lon;

            const openCageApiKey = 'ba632e6b069148ba86390f448c956f43';
            const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageApiKey}`;
            const openCageResponse = await fetch(openCageUrl);
            const openCageData = await openCageResponse.json();

            const countryDetails = openCageData.results[0].components;
            const currency = openCageData.results[0].annotations.currency;

            const countryCode = countryDetails['ISO_3166-1_alpha-2'] || '';
            const countryName = countryDetails.country || '';
            const postcode = countryDetails.postcode
            const countryCurrency = currency.name
                
            res.json({
                temp: temp,
                weatherDesc: weatherDesc,
                imageURL: imageURL,
                latitude: latitude,
                longitude: longitude,
                feelsLike: feelLike,
                humidity: humid,
                pressure: pressure,
                windspeed: windspeed,
                countryCode: countrCode,
                countryCode2: countryCode,
                countryName: countryName,
                postcode: postcode,
                countryCurrency: countryCurrency
            });
        })
    })
})

module.exports = router;