const config = require('config');
const { host, port, protocol } = config.get('api');
const proxy = require('express-http-proxy');
const request = require('request');

module.exports = {
  proxy: proxy(`${host}:${port}`, {
    https: protocol === 'https',
    preserveHostHdr: true,
  }),
  request: request.defaults({
    url: `${protocol}://${host}:${port}`,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }),
}

