const request = require('request-promise');

const openweather = request.defaults({
  json: true,
  qs: { APPID: process.env.OPENWEATHER_API_KEY, units: 'metric' },
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
});

const search = q => openweather.get('/', { qs: { q } })
  .then((response) => {
    if (!(response && response.main && response.weather && response.weather.length > 0)) {
      throw new Error('Error retrieving weather for location for OpenWeatherMap.');
    }

    const {
      weather: [info], main: { temp }, name, sys: { country },
    } = response;

    return `Hey it looks like it's ${info.description} in ${name}, ${country} and `
      + `the temperature is currently ${temp} celcius.`;
  });


module.exports = {
  search,
};
