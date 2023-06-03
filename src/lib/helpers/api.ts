import _ from 'lodash-es';
import { Nutrient } from '../types/database';

export const mutateNutrientsArray = (nutrients: Nutrient[][]) => {
  // Define an object to hold the results
  const result: any = {};

  // Loop through each array in the two-dimensional array
  _.forEach(nutrients, (innerArray) => {
    // Get the value of the symptomKey property from the first object in the array
    const symptomKey: any = _.get(innerArray, '[0].symptomKey');

    // If the symptomKey doesn't exist in the result object, create an empty array for it
    if (!result[symptomKey]) {
      result[symptomKey] = [];
    }

    // Loop through each object in the array and add its name to the result array for the symptomKey
    _.forEach(innerArray, (obj) => {
      result[symptomKey].push(obj.name);
    });
  });

  return result;
};
