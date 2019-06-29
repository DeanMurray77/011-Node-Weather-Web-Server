
const request = require('request');

let mapBoxURL;
let mapBoxAPIKey;

//Deal with Heroku not having the local config file
if(process.env.mapBoxURL && process.env.mapBoxAPIKey) {
    //If process.env vars defined, then use heroku stuff
    mapBoxURL = process.env.mapBoxURL;
    mapBoxAPIKey = process.mapBoxAPIKey;
} else {
    //Not on Heroku, so we can require the local config file.
    const config = require('../config');

    mapBoxURL = config.mapBoxURL;
    mapBoxAPIKey = config.mapBoxAPIKey;
}



const geocode = (address, callback) => { //definition.
    // callback in definiton means that function will wait for an
    // error or response

    let encodedLocation = encodeURIComponent(address);
    let mapBoxFinalURL = mapBoxURL+encodedLocation+'.json'+mapBoxAPIKey;

    //The second argument, combined with the callback() calls
    //(further down) indicate that it will wait for a response
    //or error before 'returning' via callback.
    request( {url: mapBoxFinalURL, json: true}, (error, response) => {
        if(error) {
            callback("The system was unable to connect with the location serice");
        } else if (response.body.message) {
            callback("The location system returned an error. " + error);
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