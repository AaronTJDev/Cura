export type Food = {
  brandedFoodCategory: string;
  dataType: string;
  description: string;
  fdcId: string | number;
  foodClass: string;
  gtinUpc: string | number;
  ingredients: string;
  marketCountry: string;
  servingSize: string | number;
  servingSizeUnit: string;
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
