import React from 'react';

import Channels from './Channels';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';

const App = () => (
  <div className="row">
    <div className="col-md p-0">
      <div className="d-flex flex-row vh-100">
        <Channels />
        <div className="col-md-10 d-flex flex-column-reverse p-0">
          <NewMessageForm />
          <Messages />
        </div>
      </div>
    </div>
  </div>
);

export default App;
