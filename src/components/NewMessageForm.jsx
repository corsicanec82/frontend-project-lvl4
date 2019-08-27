import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Col, Button } from 'react-bootstrap';

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
