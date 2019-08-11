import React from 'react';

const NewMessageForm = () => (
  <div className="bg-light p-3 border-top">
    <form>
      <input id="message" className="form-control" type="text" placeholder="Message" />
    </form>
  </div>
);

export default NewMessageForm;
