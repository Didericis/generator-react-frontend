# generator-react-frontend

Yeoman generator for the frontend portion of a single page react app. Out of the box server responsibilities are delivering the SPA and proxying requests to an api ONLY. Ideal for prototyping frontends and keeping a separation of concerns between frontend code and api code.

### Features

- Hot CSS reloading
- Refresh on code change
- Base [React Router v4](https://reacttraining.com/react-router/web/guides/philosophy) setup
- [Redux Form](https://redux-form.com/7.3.0/)
- Test coverage monitor
- Log in and sign up forms (optional)
- Preconfigured apollo client and container tests (optional)
- Test provider for mocking out redux and apollo
- [Styleguidist](https://github.com/styleguidist/react-styleguidist) styleguide (optional)
- Base set of styles (optional)

### Installation

This project is currently in development. If you would like to use it, clone it, cd to the repo and run `npm link`. Be sure to have [`yeoman`](http://yeoman.io/learning/index.html) installed first (`npm install -g yeoman`)

### Generating an app

```
yo react-frontend <appname>
```

### Using the generated app

To start the app: `npm start`.

To build the app for production: `npm build`

To run tests once: `npm test`

To run tests in watch mode: `npm run test:watch`

To monitor test coverage results: `npm coverage` (NOTE: requires tests to be running in watch mode)

To run the styleguide (if option was selected): `npm styleguide`

### Folder Structure

By default, specs, css, and styleguide examples sit within the same folder as the components they relate to.

    ├── client                  # Client files
    │   ├── components          # React components (Prop driven, not hooked up to redux/apollo).
    │   ├── constants           # Constants (contains aliases for route paths by default)
    │   ├── containers          # React containers (Where components get hooked up to redux/apollo)
    │   ├── entrypoints         # Contains first file loaded by app.
    │   ├── forms               # Redux forms
    │   ├── hocs                # higher order components
    │   ├── lib                 # Core pieces of pure javascript and meta components
    │   ├── redux               # Redux reducers/actions
    │   ├── styles              # Global css/scss files
    │   └── test_utils          # Test related utilities
    ├── config                  # Node-config files
    ├── public                  # Static assets
    └── server
        ├── middleware          # Express middleware
        ├── network             # Proxy/request objects (for interacting with api)
        ├── routes              # Express routes
        └── templates           # Hogan templates

### Configuration

Configuration is managed with [`node-config`](https://github.com/lorenwest/node-config).

### Notes for apollo

In order to test containers, the schema should be imported into your app. When generating the app, you will be asked for the relative path to a graphql schema. This should be a plain text file, not an executable schema. The schema can be printed to a string with [`printSchema`](http://graphql.org/graphql-js/utilities/#printschema) on your graphql server. An empty schema is provided in the root of your generated application an will be referenced if you do not specify a schema path when generating your app. If you would like to change the path to the schema referenced after generating the app, the relevant line is towards the top of `client/test_utils/test_provider.js`.
