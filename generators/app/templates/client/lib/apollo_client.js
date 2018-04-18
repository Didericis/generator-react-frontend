import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const createClient = (options = {}) => new ApolloClient({
  link: new HttpLink({ 
    credentials: 'include',
    uri: '/api/graphql', 
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
  ssrForceFetchDelay: 100,
  opts: {
    fetchPolicy: 'cache-and-network',
    credentials: 'same-origin',
  },
  ...options,
});

export default createClient();
