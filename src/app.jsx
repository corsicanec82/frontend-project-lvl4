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
import { addMessage } from './actions';

export default (gon, userData) => {
  const { channels, currentChannelId, messages } = gon;

  const dataToState = data => (
    data.reduce(({ byId, allIds }, item) => ({
      byId: { ...byId, [item.id]: item },
      allIds: [...allIds, item.id],
    }),
    { byId: {}, allIds: [] })
  );

  const initialState = {
    channels: { ...dataToState(channels), currentChannelId },
    messages: { ...dataToState(messages) },
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
    store.dispatch(addMessage(data));
  });

  render(
    <Provider store={store}>
      <UserData.Provider value={userData}>
        <App />
      </UserData.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
