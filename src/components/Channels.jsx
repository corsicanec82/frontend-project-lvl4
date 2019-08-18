import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Image, Nav, Row, Col,
} from 'react-bootstrap';
import Octicon, { Pencil, Archive } from '@primer/octicons-react';

import { getSortedChannels, getCurrentChannelId } from '../selectors';
import UserData from './UserData';

const mapStateToProps = state => ({
  channels: getSortedChannels(state),
  currentChannelId: getCurrentChannelId(state),
});

@connect(mapStateToProps)
class Channels extends React.Component {
  static contextType = UserData;

  renderChannel = (channel) => {
    const { id, name, removable } = channel;
    const { currentChannelId } = this.props;

    const renderControlButtons = () => {
      if (!removable) {
        return null;
      }
      return (
        <>
          <Button variant="primary" className="badge shadow-none p-1">
            <Octicon icon={Pencil} />
          </Button>
          <Button variant="primary" className="badge shadow-none p-1 ml-1">
            <Octicon icon={Archive} />
          </Button>
        </>
      );
    };

    return (
      <Nav.Item key={id} className="px-2 py-1">
        <Row>
          <Col>
            <Nav.Link href={`#${name}`} className="p-0" disabled={id === currentChannelId}>{`# ${name}`}</Nav.Link>
          </Col>
          <Col md="auto">
            {renderControlButtons()}
          </Col>
        </Row>
      </Nav.Item>
    );
  }

  render() {
    const { channels } = this.props;
    const { userName, avatarUrl } = this.context;

    return (
      <>
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
        >
          + Add channel
        </Button>
      </>
    );
  }
}

export default Channels;
