import axios from 'axios';
import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore';
import EncryptedStorage from 'react-native-encrypted-storage/';
import env from '../../env';

/** Components */
import { ISymptom } from '../components/SymptomSearch/SearchResultList';
import { IDisease } from '../components/SymptomSearch/DiseasesModal';

/** Helpers */
import { logError } from './helpers/platform';
import { ENCRYPTED_STORAGE_KEYS } from './encryptedStorage';
import { Nutrient } from './types/database';

const instance = axios.create({
  baseURL: env.backendConfig.hostUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  async function (config) {
    try {
      const session = await EncryptedStorage.getItem(
        ENCRYPTED_STORAGE_KEYS.CURA_USER_TOKEN
      );

      if (!session || !config) {
        throw new Error('No user session found.');
      }

      const { token } = JSON.parse(session);

      if (session && config && config.headers) {
        config.headers['Authorization'] = token;
      }
      return config;
    } catch (err) {
      logError(err);
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchSuggestions = async (
  query: string
): Promise<ISymptom[] | []> => {
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

export const fetchRelatedDiseases = async (
  symptoms: string[]
): Promise<IDisease[]> => {
  try {
    const url = '/disease';
    const response = await instance.post(
      url,
      JSON.stringify({ symptoms: symptoms })
    );
    if (response?.data) {
      const diseases = response.data;
      return diseases;
    }
    return [];
  } catch (err) {
    throw new Error(`Error fetching related diseases: ${err}`);
  }
};

export const fetchUserAccount = async (
  uid: string
): Promise<FirebaseFirestoreTypes.DocumentData | undefined> => {
  try {
    // Reference to the Firestore collection
    const collectionRef = firestore().collection('users').doc(uid);

    const doc = await collectionRef.get();
    const user = doc.data() || {};

    return user;
  } catch (err) {
    throw new Error(`Error fetching user account: ${err}`);
  }
};

// type fetchFoodSuggestionOptions = {
//   symptoms: string[];
//   filters?: string[];
//   page?: number;
//   limit?: number;
// };

// export const fetchFoodSuggestions = async (
//   options: fetchFoodSuggestionOptions
// ): Promise<any> => {};

export const fetchNutrients = async (
  symptoms: string[]
): Promise<Nutrient[]> => {
  try {
    const urls = symptoms.map(
      (symptom) => `symptoms/nutrients?symptomName=${symptom}`
    );
    const response = await Promise.all(urls.map((url) => instance.get(url)));
    const nutrients = response.map((res) => res.data);

    return nutrients;
  } catch (err) {
    throw new Error(`Error fetching nutrients: ${err}`);
  }
};
