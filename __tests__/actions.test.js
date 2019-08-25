import '@babel/polyfill';

import * as actions from '../src/actions';

describe('actions', () => {
  const channel = {
    id: 3,
    removable: true,
    name: 'channelName',
  };
  const message = {
    id: 2,
    time: Date.now(),
    channelId: 1,
  };

  it('should create an action MESSAGE_ADD', () => {
    const data = {
      id: message.id,
      attributes: message,
    };
    const expected = {
      type: 'MESSAGE_ADD',
      payload: { data },
    };
    expect(actions.addMessageSuccess({ data })).toEqual(expected);
  });

  it('should create an action CHANNEL_ADD', () => {
    const data = {
      id: channel.id,
      attributes: channel,
    };
    const expected = {
      type: 'CHANNEL_ADD',
      payload: { data },
    };
    expect(actions.addChannelSuccess({ data })).toEqual(expected);
  });

  it('should create an action CHANNEL_EDIT', () => {
    const data = {
      id: channel.id,
      attributes: channel,
    };
    const expected = {
      type: 'CHANNEL_EDIT',
      payload: { data },
    };
    expect(actions.editChannelSuccess({ data })).toEqual(expected);
  });

  it('should create an action CHANNEL_REMOVE', () => {
    const data = {
      id: channel.id,
    };
    const expected = {
      type: 'CHANNEL_REMOVE',
      payload: { data },
    };
    expect(actions.removeChannelSuccess({ data })).toEqual(expected);
  });

  it('should create an action addMessage', async () => {
    const data = {
      messageText: 'text',
      currentChannelId: 1,
      userData: {
        userName: 'userName',
        avatarUrl: 'avatarUrl',
      },
    };
    try {
      await actions.addMessage(data)();
    } catch (e) {
      expect(e.message).toMatch('Submit Validation Failed');
    }
  });
});
