export { renderers } from '../../../renderers.mjs';

const runtime = "edge";
const prerender = false;
async function getTokenEndpoint() {
  const shop = "pureplantdev.myshopify.com";
  const discovery = await fetch(
    `https://${shop}/.well-known/openid-configuration`,
    {
      headers: {
        "User-Agent": "pure-plant-headless/1.0",
        "Accept": "application/json"
      }
    }
  ).then((r) => r.json());
  return discovery.token_endpoint;
}
const POST = async ({ request }) => {
  const { code, codeVerifier, redirectUri } = await request.json();
  const tokenEndpoint = await getTokenEndpoint();
  const clientId = "1bebf8ab-21a5-49e2-87d1-083d826e2fac";
  const res = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      redirect_uri: redirectUri,
      code,
      code_verifier: codeVerifier
    })
  });
  const json = await res.json();
  return new Response(JSON.stringify(json), {
    status: res.status,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender,
    runtime
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
