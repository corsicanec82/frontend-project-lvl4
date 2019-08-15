import { createAction } from 'redux-actions';
import { SubmissionError } from 'redux-form';

import axios from 'axios';

import routes from '../routes';

export const addMessage = createAction('MESSAGE_ADD');

export const sendMessage = ({ messageText, currentChannelId }) => async () => {
  try {
    const url = routes.channelMessagesPath(currentChannelId);
    const data = { attributes: { messageText } };
    await axios.post(url, { data });
  } catch (e) {
    throw new SubmissionError({ _error: e.message });
  }
};
