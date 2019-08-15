import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessage](state, { payload: { data: { attributes } } }) {
    console.log(attributes);
    return state;
  },
}, { byId: {}, allIds: [] });

export default messages;
