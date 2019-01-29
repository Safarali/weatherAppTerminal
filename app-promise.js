const yargs = require('yargs');
// import axios from 'axios';
const axios = require('axios');
const config = require('./config/config');

const { MAPS_API_KEY, WEATHER_API_KEY } = config.keys;

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


const encodedAddress = encodeURIComponent(argv.address);

const data = {
    address: encodedAddress,
    key: MAPS_API_KEY
};

const options = {
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${MAPS_API_KEY}`
};

axios(options).then(response => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find the address');
    } 
    
    const { lat, lng } = response.data.results[0].geometry.location;
    const weatherURL = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lng}`;
    
    return axios.get(weatherURL);
}).then((response) => {
    console.log(response.data.currently);
    
    const { temperature: temp, apparentTemperature: realTemp } = response.data.currently;
    console.log(`It is currently ${temp}. It feels like ${realTemp}`); 
}).catch(e => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message); 
    }
})