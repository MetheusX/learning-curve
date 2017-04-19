import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { runSaga } from './store';
import App from './app';
import { BrowserRouter } from 'react-router-dom'
import './index.css';

const store = configureStore();
runSaga();

ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root')
);
