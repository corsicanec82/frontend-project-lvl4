import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Col, Button } from 'react-bootstrap';

import UserData from './UserData';
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
  static contextType = UserData;

  handleAddMessage = async ({ messageText }) => {
    const { reset, currentChannelId, addMessage } = this.props;
    const userData = this.context;
    await addMessage({ messageText, currentChannelId, userData });
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;

    return (
      <div className="bg-light pl-3 py-3">
        {error && <div className="mb-3 pr-2 text-danger">{error}</div>}
        <Form onSubmit={handleSubmit(this.handleAddMessage)}>
          <Form.Row className="w-100">
            <Col>
              <Field name="messageText" component="input" type="text" className="form-control" placeholder="Message" />
            </Col>
            <Col md="auto">
              <Button variant="primary" type="submit" disabled={pristine || submitting}>Send</Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default NewMessageForm;
