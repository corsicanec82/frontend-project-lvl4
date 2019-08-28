import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
  Form, Col, Button, Alert,
} from 'react-bootstrap';

import connect from '../connect';
import UserData from './UserData';
import { getCurrentChannelId } from '../selectors';

const mapStateToProps = state => ({
  currentChannelId: getCurrentChannelId(state),
});

@connect(mapStateToProps)
@reduxForm({
  form: 'newMessage',
})
class NewMessageForm extends React.Component {
  static contextType = UserData;

  handleAddMessage = async ({ messageText }) => {
    const { reset, currentChannelId, addMessage } = this.props;
    const userData = this.context;
    try {
      await addMessage({ messageText, currentChannelId, userData });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error,
    } = this.props;

    return (
      <div className="bg-light px-3 py-3">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit(this.handleAddMessage)}>
          <Form.Row className="w-100 mx-0">
            <Col className="pl-0 pr-2">
              <Field name="messageText" component="input" type="text" className="form-control" placeholder="Message" />
            </Col>
            <Col md="auto" className="px-0">
              <Button variant="primary" type="submit" disabled={pristine || submitting}>Send</Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default NewMessageForm;
