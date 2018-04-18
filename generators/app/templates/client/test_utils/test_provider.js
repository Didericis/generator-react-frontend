import React, { Component } from 'react';
import { MemoryRouter } from 'react-router';
import PropTypes from 'prop-types';
<%_ if (apollo) { _%>
import Faker from 'faker';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
<%_ } _%>

<%_ if (apollo) { _%>
// NB: Import schema string instead of the schema executable so we don't 
// end up importing server related code to the client
import schemaString from 'raw-loader!../../<%= graphqlSchemaPath %>';
import { createClient } from 'lib/apollo_client'
<%_ } _%>
import AppProvider from 'lib/app_provider';
import { store } from 'dux';

// Default mocks
export default class TestProvider extends Component {
  <%_ if (apollo) { _%>
  static createSchema = () => makeExecutableSchema({ typeDefs: schemaString });
  <%_ } _%>

  static createStore = (initialStoreState = {}) => store(initialStoreState, {
    actionHistory: (state = [], action) => [action, ...state]
  });

  static propTypes = {
    storeState: PropTypes.object,
  <%_ if (apollo) { _%>
    graphqlMocks: PropTypes.object,
  <%_ } _%>
  }

  constructor(props) {
    super(props);
  <%_ if (apollo) { _%>
    this.schema = TestProvider.createSchema();
    this.apolloClient = createClient({ link: new SchemaLink({ schema: this.schema }) });
    this.addDefaultMocks();
  <%_ } _%>
    this.store = TestProvider.createStore();
  }

  componentWillMount() {
    this.setStoreState(this.props.storeState);
  <%_ if (apollo) { _%>
    this.mockGraphql(this.props.graphqlMocks);
  <%_ } _%>
  }

  componentWillReceiveProps(props) {
    this.setStoreState(props.storeState);
  <%_ if (apollo) { _%>
    this.mockGraphql(props.graphqlMocks);
  <%_ } _%>
  }
  <%_ if (apollo) { _%>
      
  addDefaultMocks() {
    addMockFunctionsToSchema({ 
      schema: this.schema,
      mocks: {
        ID: () => Faker.random.uuid(),
        String: () => Faker.lorem.sentence(),
      }
    });
  }

  mockGraphql(mocks = {}) {
    addMockFunctionsToSchema({ 
      schema: this.schema,
      mocks,
    });
  }
  <%_ } _%>

  setStoreState(storeState) {
    this.store = TestProvider.createStore(storeState);
  }

  getStoreState() {
    return this.store.getState();
  }

  getActions() {
   return $testProvider.getStoreState().actionHistory;
  }

  getLastAction() {
    return this.getActions()[0];
  }
  
  render() {
    const { children } = this.props;

    return (
      <MemoryRouter>
        <%_ if (apollo) { _%>
        <AppProvider store={this.store} client={this.apolloClient}>
          {children}
        </AppProvider>
        <%_ } else { _%>
        <AppProvider store={this.store}>
          {children}
        </AppProvider>
        <%_ } _%>
      </MemoryRouter>
    );
  }
}
