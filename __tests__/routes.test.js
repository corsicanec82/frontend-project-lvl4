import routes from '../src/routes';

describe('routes', () => {
  it('should return the routes', () => {
    expect(routes.channelsPath()).toEqual('/api/v1/channels');
    expect(routes.channelPath(3)).toEqual('/api/v1/channels/3');
    expect(routes.channelMessagesPath(3)).toEqual('/api/v1/channels/3/messages');
  });
});
