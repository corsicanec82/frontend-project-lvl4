import faker from 'faker';
import Cookies from 'js-cookie';

export const getBrowserLanguage = () => {
  const { language } = window.navigator;
  return language ? language.substr(0, 2).toLowerCase() : 'en';
};

export const getFakeUserData = (language) => {
  faker.locale = language;
  return {
    userName: faker.internet.userName(),
    avatarUrl: faker.internet.avatar(),
  };
};

export const getUserData = () => {
  const language = getBrowserLanguage();
  const userDataFromCookies = Cookies.get('userData');
  const userData = userDataFromCookies || JSON.stringify(getFakeUserData(language));
  Cookies.set('userData', userData, { expires: 1 });
  return JSON.parse(userData);
};
