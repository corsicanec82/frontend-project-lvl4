import { createAction } from 'redux-actions';
import { SubmissionError } from 'redux-form';
import axios from 'axios';

import routes from '../routes';

export const addChannelSuccess = createAction('CHANNEL_ADD');

export const addChannel = ({ name, currentChannelId }) => async () => {
  try {
    const url = routes.channelPath(currentChannelId);
    const data = { attributes: { name } };
    await axios.post(url, { data });
  } catch (e) {
    throw new SubmissionError({ _error: e.message });
  }
};

export const invertAddChannelModalDisplay = createAction('INVERT_ADD_CHANNEL_MODAL_DISPLAY');
