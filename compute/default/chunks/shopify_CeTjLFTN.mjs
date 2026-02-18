import '@shopify/shopify-api/adapters/web-api';
import { shopifyApi, ApiVersion } from '@shopify/shopify-api';
import { s as siteDomains } from './siteDomains_DL64WWvM.mjs';

function createShopify() {
  console.log("CREATING SHOPIFY INSTANCE");
  console.log("CLI ID: " + process.env.SHOPIFY_CLIENT_ID);
  console.log("CLI SEC: " + process.env.SHOPIFY_CLIENT_SECRET);
  return shopifyApi({
    apiKey: process.env.SHOPIFY_CLIENT_ID,
    apiSecretKey: process.env.SHOPIFY_CLIENT_SECRET,
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
}

export { createShopify as c };
