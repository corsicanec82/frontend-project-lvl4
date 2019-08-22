import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: { data: { id, attributes } } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [id]: attributes },
      allIds: [...allIds, id],
    };
  },
}, { byId: {}, allIds: [] });

export default messages;
