const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        a: {
            alias: 'address',
            demand: true,
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then( (response) => {
    if( response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    var lattitude = response.data.results[0].geometry.location.lat;
    var longtitude = response.data.results[0].geometry.location.lng;
    console.log(`Address: ${response.data.results[0].formatted_address}`);
    var WeatherURL = `https://api.darksky.net/forecast/943ad4ba86d8fba59f7f3acf63874671/${lattitude},${longtitude}?lang=pl`;
    return axios.get(WeatherURL);})
    .then( ( response) => {
        console.log(`Pogoda: ${response.data.currently.summary}`);
        console.log(`Current temperature: ${response.data.currently.temperature}`);
        console.log(`Apparent temperature: ${response.data.currently.apparentTemperature}`);
    })
    .catch( (e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to Google API');
        } else {
            console.log(e.message);
        }
    });