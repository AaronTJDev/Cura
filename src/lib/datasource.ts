import axios from 'axios';
import env from '../../env';
import { AsyncStorageKeys, getItem } from './asyncStorage';

const instance = axios.create({
  baseURL: env.backendConfig.url,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  async function (config) {
    return getItem(AsyncStorageKeys.TOKEN).then((token) => {
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: token
        };
      }
      return config;
    });
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchRecipes = async () => {
  const res = await instance.get('/recipe');
  console.log('response', res);
};
