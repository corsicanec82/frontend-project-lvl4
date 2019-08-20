import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

@reduxForm({
  form: 'channelForm',
})
class ChannelDialog extends React.Component {
  mapVariantToData = {
    add: {
      title: 'Add Channel',
      body: <Field name="channelName" component="input" type="text" className="form-control" placeholder="Enter channel name" required />,
      titleSubmitButton: 'Add',
    },
    edit: {
      title: 'Edit Channel',
      body: <Field name="channelName" component="input" type="text" className="form-control" placeholder="Enter channel name" required />,
      titleSubmitButton: 'Edit',
    },
    remove: {
      title: 'Remove Channel',
      body: 'Are you sure you want to delete the channel?',
      titleSubmitButton: 'Yes',
    },
  }

  handleHide = () => {
    const { onHide, reset } = this.props;
    onHide();
    reset();
  }

  handleSubmit = async () => {
    const { onSubmit, reset } = this.props;
    await onSubmit();
    reset();
  }

  render() {
    const {
      variant, show, submitting, error,
    } = this.props;
    if (!variant) {
      return null;
    }
    const data = this.mapVariantToData[variant];

    return (
      <Modal centered show={show} onHide={this.handleHide}>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{data.title}</Modal.Title>
          </Modal.Header>
          {error && <div>error</div>}
          <Modal.Body>{data.body}</Modal.Body>
          <Modal.Footer>
            <Button type="submit" disabled={submitting}>{data.titleSubmitButton}</Button>
            <Button variant="secondary" onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ChannelDialog;
