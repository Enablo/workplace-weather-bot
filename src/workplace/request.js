const request = require('request-promise');

const graph = request.defaults({
  json: true,
  auth: { bearer: process.env.ACCESS_TOKEN },
  headers: { 'User-Agent': 'EnabloExample/1.0.0' },
  baseUrl: 'https://graph.facebook.com/v3.1',
});

module.exports = {
  graph,
};
