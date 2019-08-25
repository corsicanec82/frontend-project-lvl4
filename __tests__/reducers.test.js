import _cloneDeep from 'lodash/cloneDeep';

import messages from '../src/reducers/messages';
import { channels, channelsUIState } from '../src/reducers/channels';
import * as actions from '../src/actions';

describe('reducer messages', () => {
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

  it('should handle CHANNEL_REMOVE', () => {
    const time = Date.now();
    const messagesFromChannel1 = new Array(3).fill(null).map((el, i) => ({
      id: i + 1,
      attributes: {
        id: i + 1,
        time: time + i * 60,
        channelId: 1,
      },
    }));
    const messagesFromChannel2 = new Array(3).fill(null).map((el, i) => ({
      id: i + 4,
      attributes: {
        id: i + 3,
        time: time + i * 60,
        channelId: 2,
      },
    }));
    const messagesFromAllChannels = messagesFromChannel1.concat(messagesFromChannel2);
    let state;
    messagesFromAllChannels.forEach((m) => {
      state = messages(state, actions.addMessageSuccess({ data: m }));
    });
    let expected;
    messagesFromChannel2.forEach((m) => {
      expected = messages(expected, actions.addMessageSuccess({ data: m }));
    });
    expect(messages(state, actions.removeChannelSuccess({ data: { id: 1 } }))).toEqual(expected);
  });
});

describe('reducer channels', () => {
  let state;

  it('should return the initial state channels', () => {
    state = channels(undefined, {});
    expect(state).toEqual({
      byId: {},
      allIds: [],
      currentChannelId: null,
      defaultChannelId: null,
    });
  });

  it('should handle CHANNEL_ADD', () => {
    const currentChannelId = 1;
    const defaultChannelId = currentChannelId;
    state = { ...state, currentChannelId, defaultChannelId };
    const general = {
      id: 1,
      attributes: {
        id: 1,
        name: 'general',
        removable: false,
      },
    };
    const random = {
      id: 2,
      attributes: {
        id: 2,
        name: 'random',
        removable: false,
      },
    };
    const expected = [general, random].reduce((acc, { id, attributes }) => {
      const { byId, allIds } = acc;
      return {
        ...acc,
        byId: { ...byId, [id]: attributes },
        allIds: [...allIds, id],
      };
    }, {
      byId: {},
      allIds: [],
      currentChannelId,
      defaultChannelId,
    });
    state = channels(state, actions.addChannelSuccess({ data: general }));
    state = channels(state, actions.addChannelSuccess({ data: random }));
    expect(state).toEqual(expected);
  });

  it('should handle CHANNEL_EDIT', () => {
    const testChannel = {
      id: 3,
      attributes: {
        id: 3,
        name: 'test',
        removable: true,
      },
    };
    const testChannelExpected = { ...testChannel, attributes: { ...testChannel.attributes, name: 'renamed' } };
    const expected = channels(state, actions.addChannelSuccess({ data: testChannelExpected }));
    state = channels(state, actions.addChannelSuccess({ data: testChannel }));
    state = channels(state, actions.editChannelSuccess({ data: testChannelExpected }));
    expect(state).toEqual(expected);
  });

  it('should handle CHANNEL_REMOVE', () => {
    const channel4 = {
      id: 4,
      attributes: {
        id: 4,
        name: 'channel4',
        removable: true,
      },
    };
    const data = {
      id: 4,
    };
    const expected = _cloneDeep(state);
    state = channels(state, actions.addChannelSuccess({ data: channel4 }));
    state = channels(state, actions.removeChannelSuccess({ data }));
    expect(state).toEqual(expected);
  });

  it('should handle CHANNEL_SWITCH', () => {
    const channelId = 3;
    const expected = { ...state, currentChannelId: 3 };
    state = channels(state, actions.switchChannel({ channelId }));
    expect(state).toEqual(expected);
  });
});

describe('reducer channelsUIState', () => {
  let state;

  it('should return the initial state channelsUIState', () => {
    state = channelsUIState(undefined, {});
    expect(state).toEqual({
      channelDialog: {
        initialValues: {},
      },
    });
  });

  it('should handle CHANNEL_DIALOG_SHOW', () => {
    const channel = {
      id: 3,
      name: 'name',
      removable: true,
    };
    const expected = {
      channelDialog: {
        variant: 'edit',
        show: true,
        channelId: 3,
        initialValues: {
          channelName: 'name',
        },
      },
    };
    state = channelsUIState(state, actions.showChannelDialog({ variant: 'edit', channel }));
    expect(state).toEqual(expected);
  });

  it('should handle CHANNEL_DIALOG_HIDE', () => {
    const { channelDialog } = state;
    const expected = { ...state, channelDialog: { ...channelDialog, show: false } };
    state = channelsUIState(state, actions.hideChannelDialog());
    expect(state).toEqual(expected);
  });
});
