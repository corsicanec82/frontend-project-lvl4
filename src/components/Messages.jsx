import React from 'react';
import { connect } from 'react-redux';

import { getMessagesFromChannel } from '../selectors';

const mapStateToProps = state => ({
  messages: getMessagesFromChannel(state),
});

@connect(mapStateToProps)
class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.messageBox = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState, scrollPositionBottom) {
    if (scrollPositionBottom) {
      this.scrollToBottom();
    }
  }

  getSnapshotBeforeUpdate() {
    const { scrollHeight, clientHeight, scrollTop } = this.messageBox.current;
    return scrollTop === scrollHeight - clientHeight;
  }

  scrollToBottom = () => {
    const messageBox = this.messageBox.current;
    const { scrollHeight, clientHeight } = messageBox;
    messageBox.scrollTop = scrollHeight - clientHeight;
  }

  renderMessage = (message) => {
    const { id, messageText, userData: { userName, avatarUrl } } = message;
    return (
      <li key={id} className="list-group-item">
        <div className="media">
          <img src={avatarUrl} className="mr-3" alt={userName} />
          <div className="media-body">
            <h5 className="mt-0">{userName}</h5>
            {messageText}
          </div>
        </div>
      </li>
    );
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="p-3 overflow-auto" ref={this.messageBox}>
        <ul className="list-group list-group-flush">
          {messages.map(this.renderMessage)}
        </ul>
      </div>
    );
  }
}

export default Messages;
