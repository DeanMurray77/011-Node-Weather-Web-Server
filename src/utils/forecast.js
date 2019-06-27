const request = require('request');
const config = require('../config');

const forecast = (latitude, longitude, callback) => {
    request( {url: config.url+latitude+','+longitude, json: true}, (error, response) => {
        if(error) {
            callback('The system was unable to connect to the weather service.');
        } else if (response.body.error) {
            callback("The system wasn't able to retrieve the weather for that location");        
        } else {
            callback(undefined, response.body.daily.data[0].summary + ` Currently it is ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain.`)
        }
    })   
}

module.exports = forecast;