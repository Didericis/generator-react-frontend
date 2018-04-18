const { Router }= require('express');
const path = require('path');
const request = require('request');
const config = require('config');
const _ = require('lodash');

const app = require('./app');
const Api = require('../network/api');

module.exports = () => {
  const router = new Router();

  router.use((req, res, next) => {
    next();
  });

  // serve data
  router.use('/api', Api.proxy);

  // serve pages
  router.use('*', app());

  return router;
}
