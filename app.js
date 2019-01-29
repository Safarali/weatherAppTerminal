const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
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
    
const { address } = argv;
geocode.geocodeAddress(address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        const {address, latitude, longitude } = results;
        console.log(address);
        
        weather.getWeather(latitude, longitude, (errorMessage, response) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It is currently ${response.temp}. It feels like ${response.apparentTemp}`);                
            }
        })
    }
});
