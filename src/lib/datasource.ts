import axios from 'axios';
import env from '../../env';
import EncryptedStorage from 'react-native-encrypted-storage/';
import { ISearchResult } from '../components/SymptomSearch/SearchResultList';

const instance = axios.create({
  baseURL: env.backendConfig.hostUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  async function (config) {
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (!session || !config) {
        throw new Error('No user session found.');
      }

      const { token } = JSON.parse(session);

      if (session && config && config.headers) {
        config.headers['Authorization'] = token;
      }
      return config;
    } catch (err) {
      console.log(err);
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchSuggestions = async (
  query: string
): Promise<ISearchResult[] | []> => {
  try {
    const response = await instance.get(
      `/symptoms/search?query=${query.toLowerCase()}`
    );
    if (response?.data) {
      const suggestions = response.data;
      return suggestions;
    }
    return [];
  } catch (err) {
    throw new Error(`Error fetching suggestions: ${err}`);
  }
};
