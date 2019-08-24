import * as actions from '../src/actions';

describe('actions', () => {
  it('should create an action addMessageSuccess', () => {
    const data = {
      id: 2,
      attributes: {
        id: 2,
        time: Date.now(),
        channelId: 1,
      },
    };
    const expected = {
      type: 'MESSAGE_ADD',
      payload: { data },
    };
    expect(actions.addMessageSuccess({ data })).toEqual(expected);
  });
});
