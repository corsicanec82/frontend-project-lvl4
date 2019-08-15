import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import { getCurrentChannelId } from '../selectors';
import * as actions from '../actions';

const mapStateToProps = state => ({
  currentChannelId: getCurrentChannelId(state),
});

const actionCreators = {
  addMessage: actions.addMessage,
};

@reduxForm({
  form: 'newMessage',
})
@connect(mapStateToProps, actionCreators)
class NewMessageForm extends React.Component {
  handleAddMessage = async ({ messageText }) => {
    const { reset, currentChannelId, addMessage } = this.props;
    try {
      addMessage({ messageText, currentChannelId });
      reset();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleAddMessage)}>
        <div className="form-row">
          <div className="col">
            <Field name="messageText" component="input" type="text" className="form-control" placeholder="Message" />
          </div>
          <div className="col-auto">
            <button type="submit" disabled={pristine || submitting} className="btn btn-primary">Send</button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewMessageForm;
