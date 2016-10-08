import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// this is entry point into app, but all the work happens in App.js and its subcomponents

ReactDOM.render(
  (
  <App />
),
  document.getElementsByClassName('container-fluid')[0]
);
