const { graph } = require('./request');

const setGetStarted = () => {
  const body = {
    get_started: {
      payload: 'GET_STARTED',
    },
  };

  return graph.post('/me/messenger_profile', { body });
};

const setPersistentMenu = (persistentMenu) => {
  const body = {
    persistent_menu: persistentMenu,
  };

  return graph.post('/me/messenger_profile', { body });
};

const setGreetingText = (text) => {
  const body = {
    greeting: [
      {
        locale: 'default',
        text,
      },
    ],
  };

  return graph.post('/me/messenger_profile', { body });
};

module.exports = {
  setGetStarted,
  setPersistentMenu,
  setGreetingText,
};
