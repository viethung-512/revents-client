import React from 'react';
import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
  // createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

import App from 'app/layout/App';

const httpLink = createUploadLink({
  uri: 'http://localhost:4040',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function MyApolloProvider(props) {
  return (
    <Provider client={client}>
      <App />
    </Provider>
  );
}
