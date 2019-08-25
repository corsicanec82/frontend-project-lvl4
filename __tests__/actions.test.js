import * as actions from '../src/actions';

describe('actions', () => {
  it('should create an action MESSAGE_ADD', () => {
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

  it('should create an action CHANNEL_ADD', () => {
    const data = {
      id: 3,
      attributes: {
        id: 3,
        removable: true,
        name: 'channelName',
      },
    };
    const expected = {
      type: 'CHANNEL_ADD',
      payload: { data },
    };
    expect(actions.addChannelSuccess({ data })).toEqual(expected);
  });

  it('should create an action CHANNEL_EDIT', () => {
    const data = {
      id: 3,
      attributes: {
        id: 3,
        removable: true,
        name: 'channelName',
      },
    };
    const expected = {
      type: 'CHANNEL_EDIT',
      payload: { data },
    };
    expect(actions.editChannelSuccess({ data })).toEqual(expected);
  });

  it('should create an action CHANNEL_REMOVE', () => {
    const data = {
      id: 3,
    };
    const expected = {
      type: 'CHANNEL_REMOVE',
      payload: { data },
    };
    expect(actions.removeChannelSuccess({ data })).toEqual(expected);
  });
});
