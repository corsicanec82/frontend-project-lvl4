import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Image, Nav, Col, Row,
} from 'react-bootstrap';
import Octicon, { Pencil, X } from '@primer/octicons-react';

import { getSortedChannels, getCurrentChannelId } from '../selectors';
import UserData from './UserData';
import * as actions from '../actions';
import ChannelDialog from './ChannelDialog';

const mapStateToProps = state => ({
  channels: getSortedChannels(state),
  currentChannelId: getCurrentChannelId(state),
});

const actionCreators = {
  showChannelDialog: actions.showChannelDialog,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  static contextType = UserData;

  handleShowChannelDialog = (variant, channelId) => () => {
    const { showChannelDialog } = this.props;
    showChannelDialog({ variant, channelId });
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
              <Button variant="primary" className="badge shadow-none ml-2" onClick={this.handleShowChannelDialog('edit', id)}>
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
        <ChannelDialog />
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
