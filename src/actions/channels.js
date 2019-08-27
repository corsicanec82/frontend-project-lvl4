import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const addChannelSuccess = createAction('CHANNEL_ADD');

export const addChannel = ({ channelName }) => async () => {
  try {
    const url = routes.channelsPath();
    const data = { attributes: { name: channelName } };
    await axios.post(url, { data });
  } catch (e) {
    throw e;
  }
};

export const editChannelSuccess = createAction('CHANNEL_EDIT');

export const editChannel = ({ channelName, channelId }) => async () => {
  try {
    const url = routes.channelPath(channelId);
    const data = { attributes: { name: channelName } };
    await axios.patch(url, { data });
  } catch (e) {
    throw e;
  }
};

export const removeChannelSuccess = createAction('CHANNEL_REMOVE');

export const removeChannel = ({ channelId }) => async () => {
  try {
    const url = routes.channelPath(channelId);
    await axios.delete(url);
  } catch (e) {
    throw e;
  }
};

export const showChannelDialog = createAction('CHANNEL_DIALOG_SHOW');
export const hideChannelDialog = createAction('CHANNEL_DIALOG_HIDE');

export const switchChannel = createAction('CHANNEL_SWITCH');
