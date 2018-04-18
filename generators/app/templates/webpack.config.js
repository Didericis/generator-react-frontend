const webpack = require('webpack');
const path = require('path');
const config = require('config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const CircularDependencyPlugin = require('circular-dependency-plugin');

const entry = (file) => process.env.NODE_ENV === 'production' ?
  ['babel-polyfill', 'whatwg-fetch', path.resolve(__dirname, file)] :
  ['babel-polyfill', 'whatwg-fetch', hotMiddlewareScript, path.resolve(__dirname, file)];

module.exports = {
  devtool: 'inline-source-map',

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: {
    app: entry('client/entrypoints/app'),
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'client')
    ],
    alias: {
      dux: path.resolve(__dirname, 'client/redux')
    }
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].js'
  },

  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        use: []
      },
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'client'),
          path.resolve(__dirname, 'styleguide'),
          path.resolve(__dirname, 'node_modules/css-loader'),
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.css$/,
        include: [ 
          path.resolve(__dirname, 'client') 
        ],
        use: [{
          loader: 'css-hot-loader',
        }, { 
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          query: { 
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]', 
          }, 
        }],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        query: {
          limit: 10000,
          minetype: 'application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ].filter(loader => !!loader)
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    process.env.NODE_ENV === 'development' ? 
      new CircularDependencyPlugin({ exclude: /a\.js|node_modules/, cwd: process.cwd() }) : undefined,
    process.env.NODE_ENV === 'production' ? new webpack.optimize.UglifyJsPlugin() : undefined,
    process.env.NODE_ENV === 'production' ? undefined : new webpack.HotModuleReplacementPlugin(),
  ].filter(plugin => !!plugin)
};
