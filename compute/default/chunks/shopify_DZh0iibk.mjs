import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion } from '@shopify/shopify-api';
import { s as siteDomains } from './siteDomains_BGb6Dqiy.mjs';

const shopify = shopifyApi({
  apiKey: "f58fad659afb4354e7d6691b9cf0f093",
  apiSecretKey: "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",
  scopes: [
    "read_customer_events",
    "read_customers",
    "write_customers",
    "read_discounts",
    "write_discounts"
  ],
  hostName: siteDomains.HUB_DOMAIN,
  apiVersion: ApiVersion.January26,
  isEmbeddedApp: false
});

export { shopify as s };
