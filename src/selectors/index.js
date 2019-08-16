import { createSelector } from 'reselect';

const getChannels = state => state.channels;

export const getSortedChannels = createSelector(
  getChannels,
  channels => channels.allIds.map(id => channels.byId[id]),
);

export const getCurrentChannelId = state => state.channels.currentChannelId;

export const getMessages = state => state.messages;

export const getMessagesFromChannel = createSelector(
  getCurrentChannelId,
  getMessages,
  (currentChannel, messages) => messages.allIds
    .map(id => messages.byId[id])
    .filter(message => message.channelId === currentChannel),
);
