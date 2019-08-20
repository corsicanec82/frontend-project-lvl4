import { createAction } from 'redux-actions';
import { SubmissionError } from 'redux-form';
import axios from 'axios';

import routes from '../routes';

export const addChannelSuccess = createAction('CHANNEL_ADD');

export const addChannel = ({ channelName }) => async () => {
  try {
    const url = routes.channelsPath();
    const data = { attributes: { name: channelName } };
    await axios.post(url, { data });
  } catch (e) {
    throw new SubmissionError({ _error: e.message });
  }
};

export const showChannelDialog = createAction('CHANNEL_DIALOG_SHOW');
export const hideChannelDialog = createAction('CHANNEL_DIALOG_HIDE');
