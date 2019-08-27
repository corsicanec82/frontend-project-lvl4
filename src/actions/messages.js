import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const addMessageSuccess = createAction('MESSAGE_ADD');

export const addMessage = ({ messageText, currentChannelId, userData }) => async () => {
  try {
    const url = routes.channelMessagesPath(currentChannelId);
    const data = { attributes: { text: messageText, userData } };
    await axios.post(url, { data });
  } catch (e) {
    throw e;
  }
};
