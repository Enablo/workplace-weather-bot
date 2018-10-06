const express = require('express');
const bodyParser = require('body-parser');

const { rawBody } = require('./middleware');
const { router } = require('./routes');

const app = express();

app.use(bodyParser.json({ verify: rawBody() }));

app.get('/', (req, res) => res.sendStatus(200));
app.use(router);

module.exports = {
  app,
};
