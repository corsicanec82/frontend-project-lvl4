import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import UserData from './UserData';
import { getCurrentChannelId } from '../selectors';
import * as actions from '../actions';

const mapStateToProps = state => ({
  currentChannelId: getCurrentChannelId(state),
});

const actionCreators = {
  sendMessage: actions.sendMessage,
};

@reduxForm({
  form: 'newMessage',
})
@connect(mapStateToProps, actionCreators)
class NewMessageForm extends React.Component {
  static contextType = UserData;

  handleAddMessage = async ({ messageText }) => {
    const { reset, currentChannelId, sendMessage } = this.props;
    const userData = this.context;
    await sendMessage({ messageText, currentChannelId, userData });
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;

    return (
      <div className="bg-light p-3 border-top">
        <form onSubmit={handleSubmit(this.handleAddMessage)}>
          <div className="form-row">
            <div className="col">
              <Field name="messageText" component="input" type="text" className="form-control" placeholder="Message" />
            </div>
            <div className="col-auto">
              <button type="submit" disabled={pristine || submitting} className="btn btn-primary">Send</button>
            </div>
          </div>
          {error && <div>error</div>}
        </form>
      </div>
    );
  }
}

export default NewMessageForm;
