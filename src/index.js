import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import './components/App.css';

import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import axios from 'axios';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import * as serviceWorker from './serviceWorker';
import App from './components/App';
import theme from './theme';

import config from './config';

import UserStore from './stores/UserStore';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const httpClient = axios.create({
  baseURL: config.api.endpoint,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/vnd.api+json',
  },
});

httpClient.interceptors.request.use((httpConfig) => {
  const url = httpConfig.url[httpConfig.url.length - 1] === '?'
    ? httpConfig.url.substr(0, httpConfig.url.length - 1) : httpConfig.url;
  // eslint-disable-next-line no-param-reassign
  httpConfig.url = url[url - 1] === '/' ? url : `${url}/`;
  return httpConfig;
});

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  user: new UserStore(httpClient),
};

const history = syncHistoryWithStore(browserHistory, routingStore);

// eslint-disable-next-line no-undef
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Provider {...stores}>
      <App history={history} />
    </Provider>
  </MuiThemeProvider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
