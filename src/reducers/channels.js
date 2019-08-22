import { handleActions } from 'redux-actions';
import _omit from 'lodash/omit';

import * as actions from '../actions';

export const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { data: { id, attributes } } }) {
    const { byId, allIds, currentChannelId } = state;
    return {
      byId: { ...byId, [id]: attributes },
      allIds: [...allIds, id],
      currentChannelId,
    };
  },
  [actions.editChannelSuccess](state, { payload: { data: { id, attributes } } }) {
    const { byId, allIds, currentChannelId } = state;
    return {
      byId: { ...byId, [id]: attributes },
      allIds,
      currentChannelId,
    };
  },
  [actions.removeChannelSuccess](state, { payload: { data: { id } } }) {
    const { byId, allIds, currentChannelId } = state;
    return {
      byId: _omit(byId, id),
      allIds: allIds.filter(i => i !== id),
      currentChannelId,
    };
  },
}, { byId: {}, allIds: [], currentChannelId: null });

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
  [actions.hideChannelDialog](state) {
    const { channelDialog } = state;
    return { ...state, channelDialog: { ...channelDialog, show: false } };
  },
  [actions.addChannelSuccess](state) {
    const { channelDialog } = state;
    return { ...state, channelDialog: { ...channelDialog, show: false } };
  },
  [actions.editChannelSuccess](state) {
    const { channelDialog } = state;
    return { ...state, channelDialog: { ...channelDialog, show: false } };
  },
  [actions.removeChannelSuccess](state) {
    const { channelDialog } = state;
    return { ...state, channelDialog: { ...channelDialog, show: false } };
  },
}, { channelDialog: { initialValues: {} } });
