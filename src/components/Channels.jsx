import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, Image } from 'react-bootstrap';

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
    const { id, name } = channel;
    const { currentChannelId } = this.props;

    return (
      <ListGroup.Item
        action
        key={id}
        active={id === currentChannelId}
        className="rounded-0 border-left-0 border-right-0 py-2"
      >
        {name}
      </ListGroup.Item>
    );
  }

  render() {
    const { channels } = this.props;
    const { userName, avatarUrl } = this.context;

    return (
      <>
        <div className="m-3 mb-4">
          <p className="h5">{userName}</p>
          <Image src={avatarUrl} thumbnail width="120" />
        </div>
        <p className="h6 ml-3">Channels:</p>
        <ListGroup>
          {channels.map(this.renderChannel)}
        </ListGroup>
      </>
    );
  }
}

export default Channels;
