import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = () => ({
});

@connect(mapStateToProps)
class Messages extends React.Component {
  render() {
    return (
      <>
        messages
      </>
    );
  }
}

export default Messages;
