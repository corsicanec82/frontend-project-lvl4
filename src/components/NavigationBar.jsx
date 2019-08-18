import React from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';

import { getCurrentChannel } from '../selectors';

const mapStateToProps = state => ({
  currentChannel: getCurrentChannel(state),
});

@connect(mapStateToProps)
class NavigationBar extends React.Component {
  render() {
    const { currentChannel: { name } } = this.props;

    return (
      <Navbar bg="light" className="py-1">
        <Navbar.Brand>{`# ${name}`}</Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavigationBar;
