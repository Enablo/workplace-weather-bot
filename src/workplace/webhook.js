const crypto = require('crypto');

const Modes = {
  subscribe: 'subscribe',
};

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || '';
const { APP_SECRET } = process.env;

const handleSubscription = () => (req, res) => {
  const hub = {
    mode: req.query['hub.mode'],
    challenge: req.query['hub.challenge'],
    verifyToken: req.query['hub.verify_token'],
  };

  if (hub.mode === Modes.subscribe && hub.verifyToken === VERIFY_TOKEN) {
    return res.send(hub.challenge);
  }

  return res.sendStatus(401);
};

const xHubValidation = () => (req, res, next) => {
  const xHubSignature = req.get('x-hub-signature');

  if (!xHubSignature) return res.sendStatus(500);

  const hash = xHubSignature.split('=')[1];
  const expected = crypto.createHmac('sha1', APP_SECRET).update(req.rawBody).digest('hex');

  if (hash !== expected) return res.sendStatus(500);

  return next();
};

module.exports = {
  handleSubscription,
  xHubValidation,
};
