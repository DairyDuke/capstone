import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import { ModalProvider } from './context/Modal';
import './index.css';
import App from './App';
import configureStore from './store';
import * as sessionActions from "./store/session";
import * as bookActions from "./store/book";
import * as creatorActions from "./store/creator";

const store = configureStore();

if (process.env !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
  window.bookActions = bookActions;
  window.creatorActions = creatorActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
