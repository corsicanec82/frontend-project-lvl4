import faker from 'faker/locale/en';
import Cookies from 'js-cookie';

// export const getBrowserLanguage = () => {
//   const { language } = window.navigator;
//   return language ? language.substr(0, 2).toLowerCase() : 'en';
// };

export const getFakeUserData = (/* language */) => (
  // faker.locale = language;
  {
    userName: faker.internet.userName(),
    avatarUrl: faker.internet.avatar(),
  }
);

export const getUserData = () => {
  // const language = getBrowserLanguage();
  const userDataFromCookies = Cookies.get('userData');
  const userData = userDataFromCookies || JSON.stringify(getFakeUserData(/* language */));
  Cookies.set('userData', userData, { expires: 1 });
  return JSON.parse(userData);
};

export const getStateFromData = data => (
  data.reduce(({ byId, allIds }, item) => ({
    byId: { ...byId, [item.id]: item },
    allIds: [...allIds, item.id],
  }),
  { byId: {}, allIds: [] })
);
