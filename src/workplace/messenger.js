const { graph } = require('./request');

const send = body => graph.post('/me/messages', { body });

const sendTextMessage = (id, text) => {
  const body = {
    messaging_type: 'RESPONSE',
    recipient: { id },
    message: { text },
  };

  return send(body);
};

const sendQuickReplies = (id, text, quickReplies) => {
  const body = {
    messaging_type: 'RESPONSE',
    recipient: { id },
    message: {
      text,
      quick_replies: quickReplies.map(quickReply => ({
        content_type: 'text',
        title: quickReply.title,
        payload: quickReply.payload,
      })),
    },
  };

  return send(body);
};

module.exports = {
  sendTextMessage,
  sendQuickReplies,
};
