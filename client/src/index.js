import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import App from './App';
import { ContextProvider } from './context/Context';

var hist = createBrowserHistory()

ReactDOM.render(
  <Router history={hist}>
    <ContextProvider>
      <App/>
    </ContextProvider>
  </Router>,
  document.getElementById('root')
);
