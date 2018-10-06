require('dotenv').config();

const { setGetStarted, setPersistentMenu, setGreetingText } = require('./workplace/profile');

const persistentMenu = [
  {
    locale: 'default',
    composer_input_disabled: false,
    call_to_actions: [
      {
        title: 'Weather',
        type: 'postback',
        payload: 'WEATHER',
      },
    ],
  },
];

setGetStarted()
  .then(() => setPersistentMenu(persistentMenu))
  .then(() => setGreetingText('Want to know the weather? I\'m your bot!'))
  .then(() => console.log('Configured.'))
  .catch(err => console.error(err.message));
