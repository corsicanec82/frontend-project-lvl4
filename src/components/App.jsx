import React from 'react';

import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

const App = () => (
  <div className="row vh-100">
    <Channels />
    <div className="col-sm">
      <div className="row vh-100">
        <Messages />
        <NewMessageForm />
      </div>
    </div>
  </div>
);

export default App;
