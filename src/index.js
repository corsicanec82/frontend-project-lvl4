import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import gon from 'gon';

import app from './app';
import { getUserData } from './utils';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const userData = getUserData();

app(gon, userData);
