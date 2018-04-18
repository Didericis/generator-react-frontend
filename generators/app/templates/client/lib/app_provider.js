import React from 'react';
import { Provider } from 'react-redux';
<%_ if (apollo) { _%>
import { ApolloProvider } from 'react-apollo';
<%_ } _%>

<%_ if (apollo) { _%>
import client from 'lib/apollo_client'
<%_ } _%>
import { store } from 'dux';

const AppProvider = (props) => (
  <%_ if (apollo) { _%>
  <ApolloProvider client={props.client}>
    <Provider store={props.store}>
      { props.children }
    </Provider>
  </ApolloProvider>
  <%_ } else { _%>
    <Provider store={props.store}>
      { props.children }
    </Provider>
  <%_ } _%>
);

AppProvider.defaultProps = {
  <%_ if (apollo) { _%>
  client,
  <%_ } _%>
  store: store(),
};

export default AppProvider;
