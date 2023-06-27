export interface IPlan {
  active: boolean;
  attributes: string[];
  created: number;
  default_price: string;
  description: string;
  id: string;
  images: string[];
  livemode: false;
  metadata: {
    preferred?: string;
    priceText?: string;
  };
  name: string;
  object: string;
  shippable: boolean;
  tax_code: string;
  type: string;
  updated: number;
  url: string;
}

export type PlanResponse = {
  data: IPlan[];
  has_more: boolean;
  object: string;
  url: string;
};
