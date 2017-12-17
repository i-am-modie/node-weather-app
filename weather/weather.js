const request = require('request');

const getWeather= (lattitude, longtitude, callback) => {request({
    url: `https://api.darksky.net/forecast/943ad4ba86d8fba59f7f3acf63874671/${lattitude},${longtitude}?lang=pl`,
    json: true
},(error, response, body)=> {
    if (!error && response.statusCode===200){
        callback(undefined, {
            currentTemp: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature,
            summary: body.currently.summary
        });
    }
    else {
        callback('Unable to connect to Forecast.io');
    }
});
};

module.exports= {
    getWeather
};