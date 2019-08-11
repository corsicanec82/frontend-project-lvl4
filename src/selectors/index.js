import { createSelector } from 'reselect';

const getChannels = state => state.channels;

export const getSortedChannels = createSelector(
  getChannels,
  channels => channels.allIds.map(id => channels.byId[id]),
);

export const getCurrentChannelId = state => state.channels.currentChannelId;
