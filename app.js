const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+street+philadelphia',
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address} \nLattitude ${body.results[0].geometry.location.lat} \nLongtitude ${body.results[0].geometry.location.lng}`);
});