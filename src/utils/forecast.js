const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/' + latitude + ',' + longitude + '?units=si';

    request({ url:url, json: true }, (error,response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            //callback('Hello',undefined)
            callback(undefined,response.body.currently.temperature);
            
        }
    })
}

module.exports = forecast;