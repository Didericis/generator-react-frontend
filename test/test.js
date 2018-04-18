const { expect } = require('chai');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

describe('react-frontend:app', () => {
  subject('generate', () => 
    helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['myapp'])
      .withPrompts({ folder: '.' })
  );

  const itCreatesTheComponent = (folder, componentName, { readme = true, css = false } = {}) => {
    it(`creates the component <${componentName} />`, () => {
      return $subject.then(() => {
        const name = _.snakeCase(componentName);
        assert.file(`${folder}/${name}`);
        assert.file(`${folder}/${name}/${name}.jsx`);
        if (css) assert.file(`${folder}/${name}/${name}.css`);
        if (readme) assert.file(`${folder}/${name}/${name}.md`);
        assert.fileContent(
          `${folder}/${name}/index.js`, 
          `import ${componentName} from './${name}.jsx';`
        );
        assert.fileContent(
          `${folder}/${name}/index.js`, 
          `export default ${componentName};`
        );
      });
    });
  }

  const itCreatesTheEmptyFolder = (folderName) => {
    it(`creates an empty folder ${folderName}`, () => {
      return $subject.then((dir) => {
        const files = fs.readdirSync(path.join(dir, folderName));
        expect(files).to.eql(['.keep']);
      });
    });
  };

  itCreatesTheComponent('client/components', 'NotFound');


  itCreatesTheComponent('client/components', 'MainLayout');

  it('creates an app entrypoint in the entrypoint folder', () => {
    return $subject.then(() => {
      assert.file('client/entrypoints/app.js');
      assert.fileContent('client/entrypoints/app.js', 'import AppProvider');
      assert.fileContent('client/entrypoints/app.js', 'import NotFound');
    });
  });

  itCreatesTheComponent('client/forms', 'Form', { readme: false });

  itCreatesTheEmptyFolder('client/hocs');

  it('creates a root reducer in the index file', () => {
    return $subject.then(() => {
      assert.fileContent(
        'client/redux/index.js',
        'export const store'
      );
    });
  });

  it('creates a global css file in the styles folder', () => {
    return $subject.then(() => {
      assert.file('client/styles/global.css');
    });
  });

  it('creates a colors css file in the styles folder', () => {
    return $subject.then(() => {
      assert.file('client/styles/colors.css');
    });
  });

  it('creates a file for getting better test coverage', () => {
    return $subject.then(() => {
      assert.file('client/all.spec.js');
    });
  });

  it('creates a file for running tests', () => {
    return $subject.then(() => {
      assert.file('client/test.js');
    });
  });

  context('when apollo is enabled', () => {
    subject('generateWithApollo', () => $generate.withPrompts({ apollo: true }));

    itCreatesTheEmptyFolder('client/fragments');

    itCreatesTheEmptyFolder('client/mutations');

    itCreatesTheEmptyFolder('client/queries');

    it('adds a graphql config', () => {
      return $subject.then((dir) => {
        const env = require(path.join(dir, 'config/custom-environment-variables.json'));
        const dev = require(path.join(dir, 'config/development.json'));
        const prod = require(path.join(dir, 'config/production.json'));
        expect(Object.keys(env.api)).to.include('graphqlPath');
        expect(Object.keys(dev.api)).to.include('graphqlPath');
      });
    });

    it('creates an apollo client in lib', () => {
      return $subject.then(() => {
        assert.fileContent(
          'client/lib/apollo_client.js',
          'new ApolloClient'
        );
      });
    });

    it('creates a test provider', () => {
      return $subject.then(() => {
        assert.file('client/test_utils/test_provider.js');
      });
    });

    it('creates an app provider', () => {
      return $subject.then(() => {
        assert.file('client/lib/app_provider.js');
      });
    });
  });

  context('when apollo is disabled', () => {
    subject('generateWithApollo', () => $generate.withPrompts({ apollo: false }));

    it('does not create a fragments folder', () => {
      return $subject.then(() => {
        assert.noFile('client/fragments');
      });
    });

    it('does not create a query folder', () => {
      return $subject.then(() => {
        assert.noFile('client/queries');
      });
    });

    it('does not create a mutations folder', () => {
      return $subject.then(() => {
        assert.noFile('client/mutations');
      });
    });

    it('does not create an apollo client', () => {
      return $subject.then(() => {
        assert.noFile('client/lib/apollo_client.js');
      });
    });

    it('does not add graphql configs', () => {
      return $subject.then((dir) => {
        const env = require(path.join(dir, 'config/custom-environment-variables.json'));
        const dev = require(path.join(dir, 'config/development.json'));
        const prod = require(path.join(dir, 'config/production.json'));
        expect(Object.keys(env.api)).not.to.include('graphqlPath');
        expect(Object.keys(dev.api)).not.to.include('graphqlPath');
        expect(Object.keys(prod.api)).not.to.include('graphqlPath');
      });
    });

    it('does not create an apollo provider', () => {
      return $subject.then(() => {
        assert.noFile('client/lib/apollo_provider.js');
      });
    });
  });

  context('when accounts are enabled', () => {
    subject('generateWithAccounts', () => $generate.withPrompts({ accounts: true }));

    itCreatesTheComponent('client/forms', 'SignUp', { readme: false });

    itCreatesTheComponent('client/forms', 'LogIn', { readme: false });

    it('creates a log_in container', () => {
      return $subject.then(() => {
        assert.file('client/containers/log_in.js');
      });
    });

    it('creates a sign_up container', () => {
      return $subject.then(() => {
        assert.file('client/containers/sign_up.js');
      });
    });

    it('creates a private namespace in the routes constant', () => {
      return $subject.then(() => {
        assert.fileContent(
          'client/constants/routes.js',
          'export const PRIVATE'
        );
      });
    });
  });

  context('when accounts are disabled', () => {
    subject('generateWithoutAccounts', () => $generate.withPrompts({ accounts: false }));

    it('does not create a signup form', () => {
      return $subject.then(() => {
        assert.noFile('client/forms/sign_up');
      });
    });

    it('does not create a login form', () => {
      return $subject.then(() => {
        assert.noFile('client/forms/log_in');
      });
    });

    it('does not create a log_in container', () => {
      return $subject.then(() => {
        assert.noFile('client/containers/log_in.js');
      });
    });

    it('does  not create a sign_up container', () => {
      return $subject.then(() => {
        assert.noFile('client/containers/sign_up.js');
      });
    });

    it('does not create a private namespace in the routes constant', () => {
      return $subject.then(() => {
        assert.noFileContent(
          'client/constants/routes.js',
          'export const PRIVATE'
        );
      });
    });
  });

  context('when the base styles are enabled', () => {
    subject('generateWithBaseStyles', () => $generate.withPrompts({ baseStyles: true }));

    it('copies the economica font', () => {
      return $subject.then(() => {
        assert.file('public/fonts/Economica-Regular.ttf');
      });
    });

    it('uses the economica font in global.css', () => {
      return $subject.then(() => {
        assert.fileContent(
          'client/styles/global.css',
          'Economica'
        );
      });
    });

    itCreatesTheComponent('client/components', 'PublicNavigation');

    it('copies the logo', () => {
      return $subject.then(() => {
        assert.file('public/img/logo.png');
      });
    });
  });

  context('when the base styles are disabled', () => {
    subject('generateWithoutBaseStyles', () => $generate.withPrompts({ baseStyles: false }));

    itCreatesTheEmptyFolder('public/fonts');

    it('does not create a global.css file', () => {
      return $subject.then(() => {
        assert.noFile('client/styles/global.css');
      });
    });

    it('does not create a color.css file', () => {
      return $subject.then(() => {
        assert.noFile('client/styles/color.css');
      });
    });

    it('does not create the public navigation component', () => {
      return $subject.then(() => {
        assert.noFile('client/components/public_navigation');
      });
    });

    it('does not copy the logo', () => {
      return $subject.then(() => {
        assert.noFile('public/img/logo.png');
      });
    });
  });

  context('when the styleguide is enabled', () => {
    subject('generateWithStyleguide', () => $generate.withPrompts({ styleguide: true }));

    it('copies the styleguide config', () => {
      return $subject.then(() => {
        assert.file('styleguide.config.js');
      });
    });

    it('copies the styleguide wrapper', () => {
      return $subject.then(() => {
        assert.file('styleguide/styleguide_wrapper.jsx');
      });
    });

    it('adds the styleguide command to package.json', () => {
      return $subject.then((dir) => {
        const { scripts } = require(path.join(dir, 'package.json'));
        expect(scripts.styleguide).to.eql('styleguidist server');
      });
    });
  });

  context('when the styleguide is disabled', () => {
    subject('generateWithoutStyleguide', () => $generate.withPrompts({ styleguide: false }));

    it('copies the styleguide config', () => {
      return $subject.then(() => {
        assert.noFile('styleguide.config.js');
      });
    });

    it('copies the styleguide wrapper', () => {
      return $subject.then(() => {
        assert.noFile('styleguide/styleguide_wrapper.jsx');
      });
    });

    it('adds the styleguide command to package.json', () => {
      return $subject.then((dir) => {
        const { scripts } = require(path.join(dir, 'package.json'));
        expect(scripts.styleguide).to.be.undefined;
      });
    });
  });
});
