import { c as createShopify } from '../../../chunks/shopify_CeTjLFTN.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const runtime = "edge";
const GET = async ({ request }) => {
  const shopify = createShopify();
  const { session } = await shopify.auth.callback({
    rawRequest: request
  });
  const adminToken = session.accessToken;
  console.log("ADMIN TOKEN:", adminToken);
  return new Response("OAuth complete");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender,
  runtime
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
