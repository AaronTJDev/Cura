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

export interface CustomerResponse {
  id: string;
  object: string;
  address: Address;
  balance: number;
  created: number;
  currency: any;
  default_source: any;
  delinquent: boolean;
  description: any;
  discount: any;
  email: string;
  invoice_prefix: string;
  invoice_settings: InvoiceSettings;
  livemode: boolean;
  metadata: Metadata;
  name: string;
  next_invoice_sequence: number;
  phone: any;
  preferred_locales: any[];
  shipping: any;
  tax_exempt: string;
  test_clock: any;
}

export interface Address {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

export interface InvoiceSettings {
  custom_fields: any;
  default_payment_method: any;
  footer: any;
  rendering_options: any;
}

export interface Metadata {
  internalId: string;
}

export interface CreateSubscriptionResponse {
  clientSecret: string;
  subscriptionId: string;
}
