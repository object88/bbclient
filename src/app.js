// @flow
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouterRelay from 'react-router-relay';
import Relay from 'react-relay';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import useRelay from 'react-router-relay';
import { v4 as uuid } from 'uuid';

import {
  RelayNetworkLayer,
  urlMiddleware,
} from 'react-relay-network-layer';

import AppContainer from './containers/AppContainer';
import PhotoListContainer from './containers/PhotoListContainer';
import ViewerQueries from './queries/ViewerQueries';

import "./app.scss";

Relay.injectNetworkLayer(
  new RelayNetworkLayer([
    urlMiddleware({
      url: (req) => 'https://localhost:8081/graphql',
    }),
    next => req => {
      console.log("FOOOO");
      req.credentials = 'same-origin'; // provide CORS policy to XHR request in fetch method
      // req.headers['X-Request-ID'] = uuid.v4();
      req.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
      // req.headers['Access-Control-Allow-Credentials'] = true;
      req.headers['Access-Control-Allow-Origin'] = 'https://localhost:3001';
      // req.headers['Access-Control-Allow-Headers'] = 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With';
      // req.headers['content-type'] = 'text/plain; charset=utf-8';

      return next(req);
    },
  ]),
);

ReactDOM.render(
  <Router
      createElement={ReactRouterRelay.createElement}
      environment={Relay.Store}
      history={browserHistory}
      render={applyRouterMiddleware(useRelay)}>
    <Route path="/" component={AppContainer} queries={ViewerQueries}>
      <IndexRoute component={PhotoListContainer} queries={ViewerQueries} prepareParams={params => ({... params, status:'any' })} />
      <Route path=":status" component={PhotoListContainer} queries={ViewerQueries} />
    </Route>
  </Router>,
  document.getElementById('root')
);
