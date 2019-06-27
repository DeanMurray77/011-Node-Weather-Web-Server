const config = require('../config');
const request = require('request');

const geocode = (address, callback) => { //definition.
    // callback in definiton means that function will wait for an
    // error or response

    let encodedLocation = encodeURIComponent(address);
    let mapBoxFinalURL = config.mapBoxURL+encodedLocation+'.json'+config.mapBoxAPIKey;

    //The second argument, combined with the callback() calls
    //(further down) indicate that it will wait for a response
    //or error before 'returning' via callback.
    request( {url: mapBoxFinalURL, json: true}, (error, response) => {
        if(error) {
            callback("The system was unable to connect with the location serice");
        } else if (response.body.message) {
            callback("The location system returned an error.");
        } else if (response.body.features.length === 0) {
            callback("No such location found. Please try again with a different location.");
        } else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            });
        }
    });
}

module.exports = geocode;