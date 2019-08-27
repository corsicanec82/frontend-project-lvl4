import React from 'react';
import { ListGroup, Media, Image } from 'react-bootstrap';

import connect from '../connect';
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
    const {
      id,
      text,
      time,
      userData: { userName, avatarUrl },
    } = message;

    return (
      <ListGroup.Item as="li" key={id} className="px-0">
        <Media>
          <Image src={avatarUrl} rounded className="mr-3" width="60" />
          <Media.Body>
            <p className="mb-1">
              <span className="mr-2 font-weight-bold">{userName}</span>
              <small>{time}</small>
            </p>
            {text}
          </Media.Body>
        </Media>
      </ListGroup.Item>
    );
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="p-3 overflow-auto d-flex flex-column-reverse h-100 border-top border-bottom" ref={this.messageBox}>
        <ListGroup as="ul" variant="flush">
          {messages.map(this.renderMessage)}
        </ListGroup>
      </div>
    );
  }
}

export default Messages;
