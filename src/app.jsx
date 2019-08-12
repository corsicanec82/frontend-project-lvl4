import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import App from './components/App';
import UserData from './components/UserData';

const dataToState = data => (
  data.reduce(({ byId, allIds }, item) => ({
    byId: { ...byId, [item.id]: item },
    allIds: [...allIds, item.id],
  }),
  { byId: {}, allIds: [] })
);

export default (gon, userData) => {
  const { channels, currentChannelId } = gon;

  const initialState = {
    channels: { ...dataToState(channels), currentChannelId },
  };

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  /* eslint-enable */

  render(
    <Provider store={store}>
      <UserData.Provider value={userData}>
        <App />
      </UserData.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
