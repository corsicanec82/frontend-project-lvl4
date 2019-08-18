// import faker from 'faker';
import Cookies from 'js-cookie';
import axios from 'axios';

import routes from './routes';

export const getBrowserLanguage = () => {
  const { language } = window.navigator;
  return language ? language.substr(0, 2).toLowerCase() : 'en';
};

// export const getFakeUserData = (language) => {
//   faker.locale = language;
//   return {
//     userName: faker.internet.userName(),
//     avatarUrl: faker.internet.avatar(),
//   };
// };

export const getUserDataFromServer = async (language) => {
  try {
    const url = routes.userDataPath();
    const postData = { attributes: { language } };
    const response = await axios.post(url, { postData });
    const { data } = response.data;
    return data;
  } catch (e) {
    throw e;
  }
};

export const getUserData = async () => {
  const language = getBrowserLanguage();
  const userDataFromCookies = Cookies.get('userData');
  const userData = userDataFromCookies || JSON.stringify(await getUserDataFromServer(language));
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
