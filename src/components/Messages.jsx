import React from 'react';
import { connect } from 'react-redux';
import { animateScroll } from 'react-scroll';

import { getMessagesFromChannel } from '../selectors';

const mapStateToProps = state => ({
  messages: getMessagesFromChannel(state),
});

@connect(mapStateToProps)
class Messages extends React.Component {
  renderMessage = (message) => {
    const { id, messageText } = message;
    return (
      <li key={id} className="list-group-item">{messageText}</li>
    );
  }
  
  render() {
    const { messages } = this.props;

    return (
      <ul className="list-group list-group-flush">
        {messages.map(this.renderMessage)}
      </ul>
    );
  }
}

export default Messages;
