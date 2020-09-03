import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import 'react-calendar/dist/Calendar.css';

import ApolloProvider from './ApolloProvider';
import store, { history } from './app/redux/store';
import theme from './app/utils/theme';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <ApolloProvider />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./ApolloProvider', () => {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
