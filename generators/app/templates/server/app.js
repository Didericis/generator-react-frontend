const express = require('express');
const path = require('path');
const compression = require('compression');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const hoganExpress = require('hogan-express');
const cors = require('cors');
const config = require('config');
const forceSSL = require('express-force-ssl');

module.exports = (router) => {
  const app = express();

  // set up universal middleware
  app.use(cors({
    origin: config.get('server').host,
    credentials: true,
  }));

  // file compression
  app.use(compression());

  // attach dev middleware (hmr, etc) when in development mode
  if ([undefined, 'development'].includes(process.env.NODE_ENV)) {
    require('./middleware/dev').applyWebpackMiddleware(app);
  }

  // static file server
  app.use(express.static(path.resolve(__dirname, '../public')));

  // set up basic body parsing
  app.use(bodyParser.json());

  // set up view layer
  app.set('view engine', 'html');
  app.engine('html', hoganExpress);

  // configure cookie session
  app.use(cookieSession({
    keys: ['ai1348hasdifjqiwerhgasdf'],
    maxAge: 24 * 60 * 60 * 1000
  }));

  // healtcheck endpoint
  app.get('/healthcheck', (req, res) => {
    res.json({ message: 'ok' });
  });

  // force ssl
  if (config.get('server').forceSSL === 'true') {
    app.set('forceSSLOptions', { trustXFPHeader: true });
    app.use(forceSSL);
  }

  // define all routes
  app.use(router);

  return app;
}
