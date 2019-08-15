import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const testAction = createAction('newMessage');

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ messageText, currentChannelId }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = routes.channelMessagesPath(currentChannelId);
    const data = { attributes: { messageText } };
    await axios.post(url, { data });
    dispatch(addMessageSuccess());
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};
