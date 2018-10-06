const { sendTextMessage, sendQuickReplies } = require('../workplace/messenger');
const { weatherLocations } = require('./data');
const { search } = require('../openweather');

const handleWeatherStart = senderId => sendQuickReplies(senderId, 'Please select a country below.',
  Object.keys(weatherLocations).map(key => ({
    payload: key,
    title: weatherLocations[key].title,
  })));

const handleText = (senderId, text) => {
  if (text === 'weather') {
    return handleWeatherStart(senderId);
  }

  return sendTextMessage(senderId, 'Sorry I don\'t understand that just yet.'
    + ' Just say "weather" please!');
};

const handlePayload = (senderId, payload) => {
  if (payload === 'GET_STARTED') {
    return sendTextMessage(senderId, 'Hi there I\'m the Weather bot, either just say "weather" or '
      + 'use the persitent menu to get started.');
  }

  if (payload === 'WEATHER') {
    return handleWeatherStart(senderId);
  }

  if (payload.indexOf('_') === -1) {
    const country = weatherLocations[payload];

    return sendQuickReplies(senderId, `Please select a city for ${country.title}.`,
      Object.keys(country.cities).map(key => ({
        payload: `${payload}_${key}`,
        title: country.cities[key].title,
      })));
  }

  const [countryKey, cityKey] = payload.split('_');
  const query = `${weatherLocations[countryKey].cities[cityKey].title}, `
    + `${weatherLocations[countryKey].title}`;

  return search(query)
    .then(text => sendTextMessage(senderId, text));
};

const handleUnknown = senderId => sendTextMessage(senderId, 'Sorry I don\'t know how to handle'
  + ' that. Just say "weather" please!');

module.exports = {
  handleText,
  handlePayload,
  handleUnknown,
};
