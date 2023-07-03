import axios, { AxiosResponse } from 'axios';
import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore';
import EncryptedStorage from 'react-native-encrypted-storage/';
import { Dictionary, mapValuesSeries } from 'async';
import { Address } from '@stripe/stripe-react-native';
import env from '../../env';

/** Components */
import { ISymptom } from '../components/SymptomSearch/SearchResultList';
import { IDisease } from '../components/SymptomSearch/DiseasesModal';

/** Helpers */
import { logError } from './helpers/platform';
import { ENCRYPTED_STORAGE_KEYS } from './encryptedStorage';
import { Food, Nutrient } from './types/database';
import {
  CreateSubscriptionResponse,
  CustomerResponse,
  IPlan
} from './types/subscription';

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

type fetchFoodSuggestionOptions = {
  symptomMap: { [key: string]: string[] };
  filters?: string[];
  page?: number;
  limit?: number;
};

export const fetchFoodSuggestions = async (
  options: fetchFoodSuggestionOptions
): Promise<Dictionary<Food[]>> => {
  try {
    const { symptomMap, filters, page, limit } = options;
    const url = 'nutrients/food/';

    // const promises = Object.keys(symptomMap).map(async (symptomKey) => {
    //   const nutrients = symptomMap[symptomKey];
    //   return instance.post<any, Food[]>(url, JSON.stringify({
    //     nutrientName: nutrients,
    //     filters,
    //     page,
    //     limit,
    //     symptomKey
    //   }));
    // });

    const response = await mapValuesSeries(
      symptomMap,
      (nutrients, symptomKey, cb) => {
        instance
          .post<any, AxiosResponse<Food[]>>(
            url,
            JSON.stringify({
              nutrientName: nutrients,
              filters,
              page,
              limit,
              symptomKey
            })
          )
          .then((res) => {
            cb(null, res.data);
          })
          .catch((err) => {
            cb(err);
          });
      }
    );

    console.log('RSPONSE', response);

    if (response) {
      const foods = response as Dictionary<Food[]>;
      return foods;
    }

    return {};
  } catch (err) {
    throw new Error(`Error fetching food suggestions: ${err}`);
  }
};

export const fetchNutrients = async (
  symptoms: string[]
): Promise<Nutrient[][]> => {
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

export const getSubscriptionProducts = async (): Promise<IPlan[]> => {
  try {
    const url = 'plans';
    const response = await instance.get(url);
    return response.data.data;
  } catch (err) {
    throw new Error(`Error fetching plans: ${err}`);
  }
};

export const createStripeCustomer = async (
  email: string,
  address: Address,
  metadata: {
    internalId: string;
  }
): Promise<CustomerResponse> => {
  let postal_code = '';
  if (address.postalCode) {
    postal_code = address.postalCode;
    delete address.postalCode;
    console.log('POSTAL CODE', postal_code);
  }

  try {
    const url = 'create-customer';
    const response = await instance.post(url, {
      email,
      address: {
        ...address,
        postal_code: address.postalCode
      },
      metadata
    });
    return response.data;
  } catch (err) {
    throw new Error(`Error creating stripe customer: ${err}`);
  }
};

export const createSubscription = async (
  customerId: string,
  planId: string
): Promise<CreateSubscriptionResponse> => {
  try {
    const url = 'create-subscription';
    const response = await instance.post(
      url,
      JSON.stringify({
        customerId: customerId,
        priceId: planId
      }),
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(`Error creating subscription: ${err}`);
  }
};
