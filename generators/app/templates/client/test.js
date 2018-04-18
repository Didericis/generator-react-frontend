const sinon = require('sinon');
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const chai = require('chai');
const fetchMock = require('fetch-mock/es5/server');

global.fetchMock = fetchMock;
global.sandbox = sinon.sandbox.create();

afterEach(() => {
  sandbox.restore();
  fetchMock.restore();
});

enzyme.configure({ adapter: new Adapter() });

const context = require.context('.', true, /.+.spec\.js$/);
context.keys().forEach(context);
