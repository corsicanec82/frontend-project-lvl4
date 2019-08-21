import { handleActions } from 'redux-actions';

import * as actions from '../actions';

export const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { data: { attributes } } }) {
    const { byId, allIds, currentChannelId } = state;
    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
      currentChannelId,
    };
  },
  // *****
  [actions.editChannelSuccess](state, { payload: { data: { attributes } } }) {
    const { byId, allIds, currentChannelId } = state;
    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
      currentChannelId,
    };
  },
}, { byId: {}, allIds: [], currentChannelId: null });

export const channelsUIState = handleActions({
  [actions.showChannelDialog](state, { payload: { variant } }) {
    const channelDialog = { variant, show: true };
    return { ...state, channelDialog };
  },
  [actions.hideChannelDialog](state) {
    const { channelDialog } = state;
    return { ...state, channelDialog: { ...channelDialog, show: false } };
  },
}, { channelDialog: {} });
