import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import _isEmpty from 'lodash/isEmpty';

import { getSortedChannels, getCurrentChannelId } from '../selectors';

const mapStateToProps = state => ({
  channels: getSortedChannels(state),
  currentChannelId: getCurrentChannelId(state),
});

class Channels extends React.Component {
  renderChannel = (channel) => {
    const { id, name } = channel;
    const { currentChannelId } = this.props;
    const channelClass = cn('list-group-item list-group-item-action', { active: id === currentChannelId });

    return (
      <button key={id} type="button" className={channelClass}>{name}</button>
    );
  }

  renderChannelList = (channels) => {
    if (_isEmpty(channels)) {
      return null;
    }

    return (
      <ul className="list-group">
        {channels.map(this.renderChannel)}
      </ul>
    );
  }

  render() {
    const { channels } = this.props;

    return (
      <div className="col-sm-2 py-2 border-right bg-dark">
        <h5 className="text-white">Channels:</h5>
        <ul className="list-group">
          {this.renderChannelList(channels)}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Channels);
