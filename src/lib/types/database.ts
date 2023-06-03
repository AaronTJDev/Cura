export type Food = {
  brandedFoodCategory: string;
  dataType: string;
  description: string;
  fdcId: string | number;
  foodClass: string;
  gtinUpc: string | number;
  ingredients: string;
  marketCountry: string;
  servingSize: {
    low: string | number;
    high: string | number;
  };
  servingSizeUnit: string;
  imageUri: string;
  matchedKey: string;
};

interface INutrientSymptomRelation {
  description: string;
  references: string[];
  authors: string;
}

export interface Nutrient extends INutrientSymptomRelation {
  id?: string;
  name: string;
}
