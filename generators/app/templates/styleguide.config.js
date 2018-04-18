const path = require('path');
const config = require('config');

const webpackConfig = require('./webpack.config.js');

webpackConfig.resolve.alias['rsg-components/Wrapper'] = 
  path.join(__dirname, 'styleguide/styleguide_wrapper.jsx');

module.exports = {
  webpackConfig,
  assetsDir: path.join(__dirname, '/public'),
  title: 'Style Guide',
  components: './client/components/**/*.jsx',
  serverPort: config.get('styleguide').port,
  getExampleFilename(componentpath) {
    return componentpath.replace(/\.jsx?$/, '.md');
  }, 
}
