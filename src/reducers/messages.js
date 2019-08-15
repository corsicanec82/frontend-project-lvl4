import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import * as actions from '../actions';

const messageAddingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageSuccess]() {
    return 'finished';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
}, 'none');

const messages = handleActions({
  [actions.testAction](state, data) {
    console.log(data);
    return state;
  },
}, { byId: {}, allIds: [] });

export default combineReducers({
  messageAddingState,
  messages,
});
