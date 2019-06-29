const request = require('request');

let darkSkyUrl;

//Deal with Heroku not having the local config file
if(process.env.darkSkyUrl) {
    //If process.env vars defined, then use heroku stuff
    darkSkyUrl = process.env.darkSkyUrl;
} else {
    //Not on Heroku, so we can require the local config file.
    const config = require('../config');
    darkSkyUrl = config.darkSkyUrl;
}

const forecast = (latitude, longitude, callback) => {
    request( {url: darkSkyUrl+latitude+','+longitude, json: true}, (error, response) => {
        if(error) {
            callback('The system was unable to connect to the weather service.');
        } else if (response.body.error) {
            callback("The system wasn't able to retrieve the weather for that location");        
        } else {
            let forecast = '';
            forecast += response.body.daily.data[0].summary;
            forecast += ` Currently it is ${response.body.currently.temperature} degrees out.`;
            forecast += `There is a ${response.body.currently.precipProbability}% chance of rain.`;
            forecast += `The high today so far has been ${response.body.daily.data[0].temperatureHigh} `;
            callback(undefined, forecast);
        }
    })   
}

module.exports = forecast;