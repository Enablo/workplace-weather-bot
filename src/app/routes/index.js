const express = require('express');

const router = express.Router();

router.use('/webhook', require('./webhook').router);

module.exports = {
  router,
};
