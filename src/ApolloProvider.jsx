import React from 'react';
import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import App from 'app/layout/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function MyApolloProvider(props) {
  return (
    <Provider client={client}>
      <App />
    </Provider>
  );
}
