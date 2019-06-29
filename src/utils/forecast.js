const request = require('request');
const config = require('../config');

const forecast = (latitude, longitude, callback) => {
    request( {url: config.darkSkyUrl+latitude+','+longitude, json: true}, (error, response) => {
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