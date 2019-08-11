import React from 'react';

const NewMessageForm = () => (
  <div className="col-sm-12 py-5 h-25 border-top bg-light">
    <form>
      <div className="form-group">
        <input id="message" className="form-control" type="text" placeholder="Message" />
      </div>
    </form>
  </div>
);

export default NewMessageForm;
