import React from 'react';
import {
  ListGroup, Image, Row, Col,
} from 'react-bootstrap';

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
        <Row>
          <Col md="auto">
            <Image src={avatarUrl} rounded width="60" />
          </Col>
          <Col className="pl-0">
            <p className="mb-1">
              <span className="mr-2 font-weight-bold">{userName}</span>
              <small>{time}</small>
            </p>
            {text}
          </Col>
        </Row>
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
