import messages from '../src/reducers/messages';
import * as actions from '../src/actions';

describe('reducers', () => {
  it('should return the initial state messages', () => {
    expect(messages(undefined, {})).toEqual({
      byId: {},
      allIds: [],
    });
  });

  it('should handle MESSAGE_ADD', () => {
    const id = 2;
    const attributes = {
      id: 2,
      time: Date.now(),
      channelId: 1,
    };
    const data = {
      id,
      attributes,
    };
    const expected = {
      byId: { [id]: attributes },
      allIds: [id],
    };
    expect(messages(undefined, actions.addMessageSuccess({ data }))).toEqual(expected);
  });
});
