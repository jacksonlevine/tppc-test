import { s as siteDomains } from '../../../chunks/siteDomains_BGb6Dqiy.mjs';
export { renderers } from '../../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_SHOPIFY_CUSTOMERACCOUNTAPI_CLIENTID": "1bebf8ab-21a5-49e2-87d1-083d826e2fac", "PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN": "6b1998ad993e5edbe678ae7d446f66e7", "PUBLIC_SHOPIFY_STORE_DOMAIN": "pureplantdev.myshopify.com", "SITE": "https://main.d2o67etau3ak8h.amplifyapp.com", "SSR": true};
const runtime = "edge";
const prerender = false;
const env = Object.assign(__vite_import_meta_env__, { RESEND_API_KEY: "re_BLZWeZYc_5FpvEWGWyWTcnzLaEUa2aLmt", RESEND_FROM_EMAIL: "onboarding@resend.dev", SHOPIFY_ADMIN_ACCESS_TOKEN: "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", _: process.env._, MAIL: process.env.MAIL });
const allowedOrigins = /* @__PURE__ */ new Set([
  ...Object.values(siteDomains)
]);
function responseHeaders(origin) {
  const headers = new Headers({
    "Content-Type": "application/json",
    Vary: "Origin"
  });
  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
  return headers;
}
function jsonResponse(status, origin, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders(origin)
  });
}
const OPTIONS = async ({ request }) => {
  const origin = request.headers.get("Origin");
  return new Response(null, { status: 204, headers: responseHeaders(origin) });
};
const POST = async ({ request }) => {
  const origin = request.headers.get("Origin");
  if (origin && !allowedOrigins.has(origin)) {
    return jsonResponse(403, origin, { ok: false, error: "Origin is not allowed" });
  }
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return jsonResponse(401, origin, {
      ok: false,
      error: "Missing Authorization Bearer Shopify customer access token"
    });
  }
  const customerAccessToken = authorization.replace("Bearer ", "").trim();
  if (!customerAccessToken) {
    return jsonResponse(401, origin, {
      ok: false,
      error: "Missing Authorization Bearer Shopify customer access token"
    });
  }
  if (!env.PUBLIC_SHOPIFY_STORE_DOMAIN) {
    return jsonResponse(500, origin, {
      ok: false,
      error: "Server misconfigured: missing PUBLIC_SHOPIFY_STORE_DOMAIN"
    });
  }
  const shopDomain = env.PUBLIC_SHOPIFY_STORE_DOMAIN;
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, origin, { ok: false, error: "Invalid JSON request body" });
  }
  if (!body.event) {
    return jsonResponse(400, origin, { ok: false, error: "Missing event" });
  }
  const customerApiResponse = await fetch(
    `https://${shopDomain}/account/customer/api/unstable/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: customerAccessToken
      },
      body: JSON.stringify({
        query: `
          query verifyCustomer {
            customer {
              id
              firstName
              lastName
              emailAddress {
                emailAddress
              }
            }
          }
        `
      })
    }
  );
  if (!customerApiResponse.ok) {
    return jsonResponse(401, origin, {
      ok: false,
      error: "Shopify customer access token is invalid"
    });
  }
  const customerApiJson = await customerApiResponse.json();
  const customer = customerApiJson.data?.customer;
  if (customerApiJson.errors || !customer?.id) {
    return jsonResponse(401, origin, {
      ok: false,
      error: "Shopify customer access token is invalid"
    });
  }
  const customerRecord = {
    id: customer.id,
    email: customer.emailAddress?.emailAddress ?? null,
    firstName: customer.firstName ?? null,
    lastName: customer.lastName ?? null
  };
  let eventPayload;
  switch (body.event) {
    case "quiz_completed": {
      const quiz = body.quiz?.trim();
      if (!quiz) {
        return jsonResponse(400, origin, {
          ok: false,
          error: "Missing quiz for quiz_completed event"
        });
      }
      eventPayload = {
        event: "quiz_completed",
        sourceSite: body.sourceSite,
        happenedAt: (/* @__PURE__ */ new Date()).toISOString(),
        customerId: customerRecord.id,
        metadata: body.metadata ?? {},
        payload: {
          ...body.payload ?? {},
          quiz
        }
      };
      break;
    }
    default:
      return jsonResponse(400, origin, { ok: false, error: "Unsupported event" });
  }
  const metafieldEnabled = Boolean(env.SHOPIFY_ADMIN_ACCESS_TOKEN && env.SHOPIFY_ADMIN_API_VERSION);
  const resendEnabled = Boolean(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL);
  if (!metafieldEnabled && !resendEnabled) {
    return jsonResponse(500, origin, {
      ok: false,
      error: "Server misconfigured: configure Shopify metafield env vars and/or Resend env vars"
    });
  }
  let metafieldSuccess = false;
  if (metafieldEnabled) {
    const metafieldResponse = await fetch(
      `https://${shopDomain}/admin/api/${env.SHOPIFY_ADMIN_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": env.SHOPIFY_ADMIN_ACCESS_TOKEN
        },
        body: JSON.stringify({
          query: `
            mutation setCustomerMetafield($metafields: [MetafieldsSetInput!]!) {
              metafieldsSet(metafields: $metafields) {
                userErrors {
                  message
                }
              }
            }
          `,
          variables: {
            metafields: [
              {
                ownerId: customerRecord.id,
                namespace: "tppc_events",
                key: "latest_quiz_completed",
                type: "json",
                value: JSON.stringify(eventPayload)
              }
            ]
          }
        })
      }
    );
    if (metafieldResponse.ok) {
      const metafieldJson = await metafieldResponse.json();
      const userErrors = metafieldJson.data?.metafieldsSet?.userErrors ?? [];
      metafieldSuccess = userErrors.length === 0;
    }
  }
  let resendSuccess = false;
  if (resendEnabled && customerRecord.email) {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [customerRecord.email],
        subject: "Your quiz result was saved",
        text: JSON.stringify({ ...eventPayload, customer: customerRecord }, null, 2)
      })
    });
    resendSuccess = resendResponse.ok;
  }
  if (!metafieldSuccess && !resendSuccess) {
    return jsonResponse(500, origin, {
      ok: false,
      error: "Event received but downstream actions failed"
    });
  }
  return jsonResponse(200, origin, { ok: true });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST,
  prerender,
  runtime
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
