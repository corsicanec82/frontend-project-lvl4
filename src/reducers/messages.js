import { handleActions } from 'redux-actions';
import _omitBy from 'lodash/omitBy';

import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: { data: { id, attributes } } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [id]: attributes },
      allIds: [...allIds, id],
    };
  },
  [actions.removeChannelSuccess](state, { payload: { data: { id } } }) {
    const { byId, allIds } = state;
    return {
      byId: _omitBy(byId, m => m.channelId === id),
      allIds: allIds.filter(i => byId[i].channelId !== id),
    };
  },
}, { byId: {}, allIds: [] });

export default messages;
