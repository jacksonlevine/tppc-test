import { c as createShopify } from '../../../chunks/shopify_Bko1Ylsk.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  const shopify = createShopify();
  console.log(
    "SHOPIFY_CLIENT_ID:",
    process.env.SHOPIFY_CLIENT_ID
  );
  console.log(
    "SHOPIFY_CLIENT_SECRET:",
    process.env.SHOPIFY_CLIENT_SECRET
  );
  return shopify.auth.begin({
    shop: "pureplantdev.myshopify.com",
    callbackPath: "/api/shopify/callback",
    isOnline: false,
    rawRequest: request
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
