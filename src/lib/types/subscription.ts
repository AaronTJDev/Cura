export type Plan = {
  active: boolean;
  attributes: string[];
  created: number;
  default_price: string;
  description: string;
  id: string;
  images: string[];
  livemode: false;
  metadata: {
    preferred?: boolean;
  };
  name: string;
  object: string;
  shippable: boolean;
  tax_code: string;
  type: string;
  updated: number;
  url: string;
};

export type PlanResponse = {
  data: Plan[];
  has_more: boolean;
  object: string;
  url: string;
};
