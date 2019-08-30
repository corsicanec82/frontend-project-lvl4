import faker from 'faker/locale/en';
import Cookies from 'js-cookie';
import _keyBy from 'lodash/keyBy';

export const getFakeUserData = () => ({
  userName: faker.internet.userName(),
  avatarUrl: faker.internet.avatar(),
});

export const getUserData = () => {
  const userDataJSON = Cookies.get('userData') || JSON.stringify(getFakeUserData());
  return JSON.parse(userDataJSON);
};

export const setUserData = (userData) => {
  Cookies.set('userData', userData, { expires: 1 });
};

export const getStateFromData = (data) => {
  const iteratee = item => item.id;
  return {
    byId: _keyBy(data, iteratee),
    allIds: data.map(iteratee),
  };
};
