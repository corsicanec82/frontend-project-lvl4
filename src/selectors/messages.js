import { createSelector } from 'reselect';

import { getCurrentChannelId } from './channels';

export const getMessages = state => state.messages;

export const getMessagesFromChannel = createSelector(
  getCurrentChannelId,
  getMessages,
  (currentChannel, { byId, allIds }) => allIds
    .map((id) => {
      const message = byId[id];
      const time = new Date(message.time).toLocaleTimeString();
      return { ...message, time };
    })
    .filter(m => m.channelId === currentChannel),
);
