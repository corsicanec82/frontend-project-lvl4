import { handleActions } from 'redux-actions';
import _omit from 'lodash/omit';

import * as actions from '../actions';

export const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { data: { id, attributes } } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: { ...byId, [id]: attributes },
      allIds: [...allIds, id],
    };
  },
  [actions.editChannelSuccess](state, { payload: { data: { id, attributes } } }) {
    const { byId } = state;
    return {
      ...state,
      byId: { ...byId, [id]: attributes },
    };
  },
  [actions.removeChannelSuccess](state, { payload: { data: { id } } }) {
    const {
      byId,
      allIds,
      currentChannelId,
      defaultChannelId,
    } = state;
    return {
      ...state,
      byId: _omit(byId, id),
      allIds: allIds.filter(i => i !== id),
      currentChannelId: currentChannelId === id ? defaultChannelId : currentChannelId,
    };
  },
  [actions.switchChannel](state, { payload: { channelId } }) {
    return {
      ...state,
      currentChannelId: channelId,
    };
  },
}, {
  byId: {},
  allIds: [],
  currentChannelId: null,
  defaultChannelId: null,
});

const hideChannelDialog = (state) => {
  const { channelDialog } = state;
  return { ...state, channelDialog: { ...channelDialog, show: false } };
};

export const channelsUIState = handleActions({
  [actions.showChannelDialog](state, { payload: { variant, channel } }) {
    const channelDialog = {
      variant,
      show: true,
      channelId: channel && channel.id,
      initialValues: {
        channelName: channel && channel.name,
      },
    };
    return { ...state, channelDialog };
  },
  [actions.hideChannelDialog]: hideChannelDialog,
  [actions.addChannelSuccess]: hideChannelDialog,
  [actions.editChannelSuccess]: hideChannelDialog,
  [actions.removeChannelSuccess]: hideChannelDialog,
}, { channelDialog: { initialValues: {} } });
