import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Image, Nav, Modal, Form, Col, Row,
} from 'react-bootstrap';
import Octicon, { Pencil, X } from '@primer/octicons-react';
import { Field, reduxForm } from 'redux-form';

import { getSortedChannels, getCurrentChannelId } from '../selectors';
import UserData from './UserData';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { addChannelModalDisplay } = state.channelsUIState;
  return {
    channels: getSortedChannels(state),
    currentChannelId: getCurrentChannelId(state),
    addChannelModalDisplay,
  };
};

const actionCreators = {
  invertAddChannelModalDisplay: actions.invertAddChannelModalDisplay,
};

@reduxForm({
  form: 'addChannel',
})
@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  static contextType = UserData;

  handleInvertModalDisplay = () => {
    const { invertAddChannelModalDisplay, reset } = this.props;
    invertAddChannelModalDisplay();
    reset();
  }

  renderAddChannelModal = () => {
    const { addChannelModalDisplay } = this.props;

    return (
      <Modal centered show={addChannelModalDisplay} onHide={this.handleInvertModalDisplay}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Add Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Channel name</Form.Label>
            <Field name="channelName" component="input" type="text" className="form-control" />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Add</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }

  renderChannel = (channel) => {
    const { id, name, removable } = channel;
    const { currentChannelId } = this.props;

    return (
      <Nav.Item key={id} className="px-2 py-1">
        <Row className="m-0">
          <Col className="p-0">
            <Nav.Link href={`#${name}`} className="p-0" disabled={id === currentChannelId}>{`# ${name}`}</Nav.Link>
          </Col>
          {removable && (
            <Col md="auto" className="p-0">
              <Button variant="primary" className="badge shadow-none ml-2">
                <Octicon icon={Pencil} />
              </Button>
              <Button variant="primary" className="badge shadow-none ml-1">
                <Octicon icon={X} />
              </Button>
            </Col>
          )}
        </Row>
      </Nav.Item>
    );
  }

  render() {
    const { channels } = this.props;
    const { userName, avatarUrl } = this.context;

    return (
      <>
        {this.renderAddChannelModal()}
        <div className="m-3 mb-4">
          <p className="h6">{userName}</p>
          <Image src={avatarUrl} thumbnail width="120" />
        </div>
        <p className="h6 ml-2"><strong>Channels</strong></p>
        <Nav className="flex-column">
          {channels.map(this.renderChannel)}
        </Nav>
        <Button
          variant="light"
          className="border-0 rounded-0 w-100 text-left px-2 py-1 mt-2 shadow-none"
          onClick={this.handleInvertModalDisplay}
        >
          + Add channel
        </Button>
      </>
    );
  }
}

export default Channels;
