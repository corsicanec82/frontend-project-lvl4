import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channelDialog } = state.channelsUIState;
  return channelDialog;
};

const actionCreators = {
  hideChannelDialog: actions.hideChannelDialog,
  addChannel: actions.addChannel,
  editChannel: actions.editChannel,
  removeChannel: actions.removeChannel,
};

@connect(mapStateToProps, actionCreators)
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
        await addChannel({ channelName });
        reset();
      },
    },
    edit: {
      title: 'Edit Channel',
      body: <Field name="channelName" component="input" type="text" className="form-control" placeholder="Enter channel name" required />,
      titleSubmitButton: 'Edit',
      handleSubmit: async ({ channelName }) => {
        const { editChannel, reset, channelId } = this.props;
        await editChannel({ channelName, channelId });
        reset();
      },
    },
    remove: {
      title: 'Remove Channel',
      body: 'Are you sure you want to delete the channel?',
      titleSubmitButton: 'Yes',
      handleSubmit: async () => {
        const { removeChannel, reset, channelId } = this.props;
        await removeChannel({ channelId });
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
