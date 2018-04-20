const Generator = require('yeoman-generator');
const read = require('fs-readdir-recursive');
const _ = require('lodash');
const path = require('path');

const EXCLUSIVE = {
  accounts: [
    'client/forms/sign_up',
    'client/forms/log_in',
    'client/components/authentication',
    'client/containers/sign_up',
    'client/containers/log_in',
  ],
  apollo: [
    'client/fragments',
    'client/mutations',
    'client/queries',
    'client/lib/apollo_client.js',
    'empty_schema'
  ],
  baseStyles: [
    'client/components/public_navigation',
    'public/fonts/Economica-Regular.ttf',
    'public/img/logo.png',
    '.css'
  ],
  styleguide: [
    'styleguide/styleguide_wrapper.jsx',
    'styleguide.config.js',
  ]
};

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: true });
  }
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'folder',
      message : 'Folder name',
      default : `${_.snakeCase(this.options.appname)}`, 
    }, {
      type: 'confirm',
      name: 'baseStyles',
      message: 'Include a base set of styles?'
    }, {
      type: 'confirm',
      name: 'accounts',
      message: 'Include a basic sign up and log in form?',
    }, {
      type: 'confirm',
      name: 'styleguide',
      message: 'Include a styleguide?',
    }, {
      type: 'confirm',
      name: 'apollo',
      message: 'Include apollo client?',
    }]).then((answers) => {
      this.appname = this.options.appname;
      this.destinationRoot(path.join(process.cwd(), answers.folder));
      this.config.set('apollo', answers.apollo);
      this.config.set('accounts', answers.accounts);
      this.config.set('baseStyles', answers.baseStyles);
      this.config.set('styleguide', answers.styleguide);
      if (answers.apollo) return this.prompt([{
        type: 'input',
        name: 'graphqlSchemaPath',
        message: 'Path to graphql schema',
        default: 'empty_schema'
      }]).then(({ graphqlSchemaPath }) => {
        this.config.set('graphqlSchemaPath', graphqlSchemaPath);
      });
    });
  }
  writing() {
    const vars = {
      accounts: this.config.get('accounts'),
      apollo: this.config.get('apollo'),
      appname: this.appname,
      baseStyles: this.config.get('baseStyles'),
      graphqlSchemaPath: this.config.get('graphqlSchemaPath'),
      styleguide: this.config.get('styleguide'),
    }
    read(this.templatePath('.'), () => true).forEach(file => {
      const skip = Object.keys(EXCLUSIVE).some(key => {
        return !this.config.get(key) && EXCLUSIVE[key].some(f => file.includes(f));
      });
      if (skip) return;
      const from = this.templatePath(file);
      const to = this.destinationPath(file);
      if (['.js', '.json', '.css', '.jsx', '.html'].includes(path.extname(file))) {
        this.fs.copyTpl(from, to, vars);
      } else {
        this.fs.copy(from, to);
      }
    });

  }
  install() {
    const deps = [
      'react', 'react-router-dom', 'react-dom', 'redux', 'redux-thunk', 
      'redux-devtools-extension', 'redux-form', 'recompose',
      'config', 'express', 'request', 'express-http-proxy', 'compression',
      'cookie-session', 'hogan-express', 'cors', 'express-force-ssl', 'react-redux',
      'classnames'
    ];
    const devDeps = [
      'babel-core', 'babel-loader', 'babel-polyfill', 'babel-preset-es2015',
      'babel-preset-react', 'babel-preset-stage-2', 'whatwg-fetch', 'css-hot-loader',
      'mini-css-extract-plugin', 'circular-dependency-plugin',
      'webpack', 'webpack-hot-middleware', 'webpack-dev-middleware', 'css-loader',
      'karma', 'bdd-lazy-var', 'chai', 'enzyme', 'enzyme-adapter-react-16',
      'mocha', 'sinon', 'karma-mocha', 'karma-coverage-istanbul-reporter',
      'karma-webpack', 'karma-phantomjs-launcher', 'karma-sourcemap-loader',
      'karma-mocha-reporter', 'istanbul-instrumenter-loader', 'fetch-mock',
    ];
    if (this.config.get('apollo')) {
      deps.push(...[
        'apollo-client', 'apollo-link-http', 'apollo-cache-inmemory', 
        'react-apollo', 'graphql', 'graphql-tools'
      ]);
    }
    if (this.config.get('styleguide')) {
      devDeps.push('react-styleguidist', 'raw-loader', 'faker', 'apollo-link-schema');
    }
    this.npmInstall(deps);
    this.npmInstall(devDeps, { 'save-dev': true });
  }
}
