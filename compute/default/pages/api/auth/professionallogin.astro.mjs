import { SignJWT } from 'jose';
import { npiValid } from 'npi-validator';
export { renderers } from '../../../renderers.mjs';

const runtime = "edge";
const prerender = false;
const GATEWAY_PASSWORD = "1234";
const GATEWAY_JWT_SECRET = "3f9c7e0a1d4b8c6e2f5a9b0d7c1e4a6f8b2c9d5e7a0c4b1f6e8d3a9c2b5";
const key = new TextEncoder().encode(GATEWAY_JWT_SECRET);
async function npiExists(npi) {
  const res = await fetch(
    `https://npiregistry.cms.hhs.gov/api/?version=2.1&number=${encodeURIComponent(npi)}`,
    { method: "GET" }
  );
  if (!res.ok) return false;
  const data = await res.json().catch(() => null);
  return !!data && Array.isArray(data.results) && data.results.length > 0;
}
const POST = async ({ request, cookies }) => {
  const { password } = await request.json().catch(() => ({}));
  const pw = typeof password === "string" ? password.trim() : "";
  const isPassword = pw === GATEWAY_PASSWORD;
  const isValidNpi = npiValid(pw) && await npiExists(pw);
  if (!isPassword && !isValidNpi) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const token = await new SignJWT({ cas: true }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setIssuedAt().setExpirationTime("1h").sign(key);
  cookies.set("gateway", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60
  });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
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
