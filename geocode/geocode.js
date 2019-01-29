const request = require('request');
const config = require('../config/config.json');
const KEY = config['keys']['MAPS_API_KEY'];

const geocodeAddress = (address, cb) => {
    const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${KEY}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            cb('Unable to connect to Google servers')
        } else if (body.status === 'ZERO_RESULTS') {
            cb('Unable to find that address');
        } else if (body.status === 'OK') {
            cb(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports = {
    geocodeAddress
}