const request = require('request');
const config = require('../config/config.json');
const KEY = config['keys']['WEATHER_API_KEY'];

const getWeather = (lat, long, cb) => {
    request({
        url: `https://api.darksky.net/forecast/${KEY}/${lat},${long}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          cb(undefined, {
              temp: body.currently.temprature,
              apparentTemp: body.currently.apparentTemperature
          });
        } else {
            cb('Unable to fetch weather');
        }
    })
};

module.exports = {
    getWeather
}