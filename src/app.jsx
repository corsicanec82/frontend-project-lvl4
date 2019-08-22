import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

import reducers from './reducers';
import App from './components/App';
import UserData from './components/UserData';
import { getUserData, getStateFromData } from './utils';
import {
  addMessageSuccess, addChannelSuccess, editChannelSuccess, removeChannelSuccess,
} from './actions';

export default (gon) => {
  const { channels, currentChannelId, messages } = gon;

  const initialState = {
    channels: { ...getStateFromData(channels), currentChannelId },
    messages: getStateFromData(messages),
  };

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );

  const socket = io();
  socket.on('newMessage', (data) => {
    store.dispatch(addMessageSuccess(data));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(addChannelSuccess(data));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(editChannelSuccess(data));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannelSuccess(data));
  });

  render(
    <Provider store={store}>
      <UserData.Provider value={getUserData()}>
        <App />
      </UserData.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
