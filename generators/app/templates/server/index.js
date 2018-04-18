const config = require('config');

const root = require('./routes/root');
const app = require('./app');

const PORT = config.get('server').port;
app(root()).listen(PORT, () => {
  console.log('Express server running at localhost:' + PORT);
});
