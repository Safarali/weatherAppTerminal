const request = require('request');
const config = require('./config/config.json');
const KEY = config['keys']['MAPS_API_KEY'];
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

    console.log(argv);
    
const { address } = argv;
const encodedAddress = encodeURIComponent(address);

request({
   url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${KEY}`,
   json: true
}, (error, response, body) => {
    if (error) {
       console.log('Unable to connect to Google servers');
       console.log(error);
       
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address');
    } else if (body.status === 'OK') {
        console.log(body.results[0].formatted_address);
        console.log(body.results[0].geometry.location);
    }
});