const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

// console.log(encodeURIComponent(argv.a));

geocode.googleAPI(argv.a, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }
    else{
        console.log(`Address: ${results.address}`);
        weather.getWeather(results.lattitude, results.longtitude, (errorMessage, results) => {
            if(errorMessage){
                console.log(errorMessage);
            }
            else{
                console.log(`Pogoda: ${results.summary}`);
                console.log(`Current temperature: ${results.currentTemp}`);
                console.log(`Apparent temperature: ${results.apparentTemperature}`);
            }
        });
    }
});