import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import App from 'app/layout/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function MyApolloProvider(props) {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default MyApolloProvider;
