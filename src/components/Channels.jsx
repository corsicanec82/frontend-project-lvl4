import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

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
    const channelClass = cn('list-group-item list-group-item-action', { active: id === currentChannelId });

    return (
      <button key={id} type="button" className={channelClass}>{name}</button>
    );
  }

  render() {
    const { channels } = this.props;
    const { userName, avatarUrl } = this.context;

    return (
      <div className="d-flex flex-column col-md-2 bg-light p-3 border-right">
        <div className="mb-4">
          <p className="h5">{userName}</p>
          <img src={avatarUrl} alt="avatar" className="img-thumbnail" />
        </div>
        <h5 className="text-dark">Channels:</h5>
        <ul className="list-group">
          {channels.map(this.renderChannel)}
        </ul>
      </div>
    );
  }
}

export default Channels;
