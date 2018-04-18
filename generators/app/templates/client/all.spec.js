// Use this to get better coverage results

const context = require.context('components', true, /.*.jsx|(^(?!.*spec|test|index).*.js)/);
context.keys().forEach(context);
