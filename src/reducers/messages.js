import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: { data: { attributes } } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
}, { byId: {}, allIds: [] });

export default messages;
