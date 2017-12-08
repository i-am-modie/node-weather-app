const request = require('request');
const yargs = require('yargs');

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

var encodedAddress = encodeURIComponent(argv.a)

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
    json: true
}, (error, response, body) => {

    if(error) console.log('Unable to connect to Google servers');
    else if(body.status === 'ZERO_RESULTS') console.log('Unable to find that address');
    else if(response)
    if (body.status === 'OK') {
        console.log(`Address: ${body.results[0].formatted_address}
                    Lattitude ${body.results[0].geometry.location.lat} 
                    Longtitude ${body.results[0].geometry.location.lng}`);
    }
});