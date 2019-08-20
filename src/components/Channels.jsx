import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Button, Image, Nav, Col, Row, Modal, Form,
} from 'react-bootstrap';
import Octicon, { Pencil, X } from '@primer/octicons-react';

import { getSortedChannels, getCurrentChannelId } from '../selectors';
import UserData from './UserData';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channelDialog } = state.channelsUIState;
  return {
    channels: getSortedChannels(state),
    currentChannelId: getCurrentChannelId(state),
    channelDialog,
  };
};

const actionCreators = {
  showChannelDialog: actions.showChannelDialog,
  hideChannelDialog: actions.hideChannelDialog,
  addChannel: actions.addChannel,
};

@reduxForm({
  form: 'channelForm',
})
@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  static contextType = UserData;

  handleShowChannelDialog = variant => () => {
    const { showChannelDialog } = this.props;
    showChannelDialog({ variant });
  }

  handleHideChannelDialog = () => {
    const { hideChannelDialog, reset } = this.props;
    hideChannelDialog();
    reset();
  }

  handleSubmitAddChannel = async ({ channelName }) => {
    const { addChannel, reset } = this.props;
    await addChannel({ channelName });
    reset();
  }

  renderModalAddChannel = () => {
    const {
      handleSubmit, submitting, error, channelDialog: { show },
    } = this.props;

    return (
      <Modal centered show={show} onHide={this.handleHideChannelDialog}>
        <Form onSubmit={handleSubmit(this.handleSubmitAddChannel)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <div className="mb-3 text-danger">{error}</div>}
            <Field name="channelName" component="input" type="text" className="form-control" placeholder="Enter channel name" required />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" disabled={submitting}>Add</Button>
            <Button variant="secondary" onClick={this.handleHideChannelDialog}>Close</Button>
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
    console.log('render');
    const { channels } = this.props;
    const { userName, avatarUrl } = this.context;

    return (
      <>
        {this.renderModalAddChannel()}
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
          onClick={this.handleShowChannelDialog('add')}
        >
          + Add channel
        </Button>
      </>
    );
  }
}

export default Channels;
