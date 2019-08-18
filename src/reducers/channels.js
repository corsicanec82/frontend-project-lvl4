import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { data: { attributes } } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
}, { byId: {}, allIds: [], currentChannelId: null });

export default channels;
