import faker from 'faker/locale/en';
import Cookies from 'js-cookie';
import _keyBy from 'lodash/keyBy';

export const getFakeUserData = () => ({
  userName: faker.internet.userName(),
  avatarUrl: faker.internet.avatar(),
});

export const setUserData = () => {
  const userDataFromCookies = Cookies.get('userData');
  const userData = userDataFromCookies || JSON.stringify(getFakeUserData());
  Cookies.set('userData', userData, { expires: 1 });
};

export const getUserData = () => {
  setUserData();
  return JSON.parse(Cookies.get('userData'));
};

export const getStateFromData = (data) => {
  const iteratee = item => item.id;
  return {
    byId: _keyBy(data, iteratee),
    allIds: data.map(iteratee),
  };
};
