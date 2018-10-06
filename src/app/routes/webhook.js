const express = require('express');

const { handleSubscription, xHubValidation } = require('../../workplace/webhook');
const { handleText, handlePayload, handleUnknown } = require('../../bot');

const processMessage = (m) => {
  const { sender: { id: senderId }, postback } = m;

  const text = m.message && m.message.text;
  const quickReply = m.message && m.message.quick_reply;

  if (postback) return handlePayload(senderId, postback.payload);

  if (quickReply) return handlePayload(senderId, quickReply.payload);

  if (text) return handleText(senderId, text);

  return handleUnknown(senderId);
};

const router = express.Router();

router.get('/', handleSubscription());

router.post('/', xHubValidation(), (req, res) => {
  res.sendStatus(200);

  const { object, entry } = req.body;

  if (object === 'page') {
    entry.forEach((e) => {
      const { messaging } = e;
      messaging.forEach(m => processMessage(m)
        .then(() => console.info('Successfully processed page message.'))
        .catch(err => console.error(`Error processing page message. ${err.message}`)));
    });
  }
});

module.exports = {
  router,
};
