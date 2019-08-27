import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import connect from '../connect';

const mapStateToProps = (state) => {
  const { channelDialog } = state.channelsUIState;
  return channelDialog;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'channelForm',
  enableReinitialize: true,
})
class ChannelDialog extends React.Component {
  mapVariantToData = {
    add: {
      title: 'Add Channel',
      body: <Field name="channelName" component="input" type="text" className="form-control" placeholder="Enter channel name" required />,
      titleSubmitButton: 'Add',
      handleSubmit: async ({ channelName }) => {
        const { addChannel, reset } = this.props;
        try {
          await addChannel({ channelName });
        } catch (e) {
          throw new SubmissionError({ _error: e.message });
        }
        reset();
      },
    },
    edit: {
      title: 'Edit Channel',
      body: <Field name="channelName" component="input" type="text" className="form-control" placeholder="Enter channel name" required />,
      titleSubmitButton: 'Edit',
      handleSubmit: async ({ channelName }) => {
        const { editChannel, reset, channelId } = this.props;
        try {
          await editChannel({ channelName, channelId });
        } catch (e) {
          throw new SubmissionError({ _error: e.message });
        }
        reset();
      },
    },
    remove: {
      title: 'Remove Channel',
      body: 'Are you sure you want to delete the channel?',
      titleSubmitButton: 'Yes',
      handleSubmit: async () => {
        const { removeChannel, reset, channelId } = this.props;
        try {
          await removeChannel({ channelId });
        } catch (e) {
          throw new SubmissionError({ _error: e.message });
        }
        reset();
      },
    },
  }

  handleHideChannelDialog = () => {
    const { hideChannelDialog, reset } = this.props;
    hideChannelDialog();
    reset();
  }

  render() {
    const {
      submitting, error, handleSubmit, variant, show,
    } = this.props;
    if (!variant) {
      return null;
    }
    const data = this.mapVariantToData[variant];

    return (
      <Modal centered show={show} onHide={this.handleHideChannelDialog}>
        <Form onSubmit={handleSubmit(data.handleSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>{data.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <div className="mb-3 text-danger">{error}</div>}
            {data.body}
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" disabled={submitting}>{data.titleSubmitButton}</Button>
            <Button variant="secondary" onClick={this.handleHideChannelDialog}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ChannelDialog;
