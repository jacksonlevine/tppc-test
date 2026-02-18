import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_3ar5ST87.mjs';
import { manifest } from './manifest_BJvOafs_.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/auth/professionallogin.astro.mjs');
const _page3 = () => import('./pages/api/auth/token.astro.mjs');
const _page4 = () => import('./pages/api/events/customer.astro.mjs');
const _page5 = () => import('./pages/api/shopify/auth.astro.mjs');
const _page6 = () => import('./pages/api/shopify/callback.astro.mjs');
const _page7 = () => import('./pages/auth/callback.astro.mjs');
const _page8 = () => import('./pages/products/_slug_.astro.mjs');
const _page9 = () => import('./pages/products.astro.mjs');
const _page10 = () => import('./pages/professional.astro.mjs');
const _page11 = () => import('./pages/quality/coa.astro.mjs');
const _page12 = () => import('./pages/quality/iso-iec-17025-accreditation.astro.mjs');
const _page13 = () => import('./pages/quality/manufacturing-standards.astro.mjs');
const _page14 = () => import('./pages/science/molecular-precision.astro.mjs');
const _page15 = () => import('./pages/science/plant-origins.astro.mjs');
const _page16 = () => import('./pages/science/sheep-grease-truth.astro.mjs');
const _page17 = () => import('./pages/vitamind3truth.astro.mjs');
const _page18 = () => import('./pages/_lang_/about.astro.mjs');
const _page19 = () => import('./pages/_lang_/products/_slug_.astro.mjs');
const _page20 = () => import('./pages/_lang_/products.astro.mjs');
const _page21 = () => import('./pages/_lang_/professional.astro.mjs');
const _page22 = () => import('./pages/_lang_/quality/coa.astro.mjs');
const _page23 = () => import('./pages/_lang_/quality/iso-iec-17025-accreditation.astro.mjs');
const _page24 = () => import('./pages/_lang_/quality/manufacturing-standards.astro.mjs');
const _page25 = () => import('./pages/_lang_/science/molecular-precision.astro.mjs');
const _page26 = () => import('./pages/_lang_/science/plant-origins.astro.mjs');
const _page27 = () => import('./pages/_lang_/science/sheep-grease-truth.astro.mjs');
const _page28 = () => import('./pages/_lang_/vitamind3truth.astro.mjs');
const _page29 = () => import('./pages/_lang_.astro.mjs');
const _page30 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/auth/professionallogin.ts", _page2],
    ["src/pages/api/auth/token.ts", _page3],
    ["src/pages/api/events/customer.ts", _page4],
    ["src/pages/api/shopify/auth.ts", _page5],
    ["src/pages/api/shopify/callback.ts", _page6],
    ["src/pages/auth/callback.astro", _page7],
    ["src/pages/products/[slug].astro", _page8],
    ["src/pages/products/index.astro", _page9],
    ["src/pages/professional.astro", _page10],
    ["src/pages/quality/coa.astro", _page11],
    ["src/pages/quality/iso-iec-17025-accreditation.astro", _page12],
    ["src/pages/quality/manufacturing-standards.astro", _page13],
    ["src/pages/science/molecular-precision.astro", _page14],
    ["src/pages/science/plant-origins.astro", _page15],
    ["src/pages/science/sheep-grease-truth.astro", _page16],
    ["src/pages/vitamind3truth.astro", _page17],
    ["src/pages/[lang]/about.astro", _page18],
    ["src/pages/[lang]/products/[slug].astro", _page19],
    ["src/pages/[lang]/products/index.astro", _page20],
    ["src/pages/[lang]/professional.astro", _page21],
    ["src/pages/[lang]/quality/coa.astro", _page22],
    ["src/pages/[lang]/quality/iso-iec-17025-accreditation.astro", _page23],
    ["src/pages/[lang]/quality/manufacturing-standards.astro", _page24],
    ["src/pages/[lang]/science/molecular-precision.astro", _page25],
    ["src/pages/[lang]/science/plant-origins.astro", _page26],
    ["src/pages/[lang]/science/sheep-grease-truth.astro", _page27],
    ["src/pages/[lang]/vitamind3truth.astro", _page28],
    ["src/pages/[lang]/index.astro", _page29],
    ["src/pages/index.astro", _page30]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "client": "file:///home/jackson/Documents/GitHub/ecommerce/sites/thepureplantcompany/.amplify-hosting/static/",
    "server": "file:///home/jackson/Documents/GitHub/ecommerce/sites/thepureplantcompany/.amplify-hosting/compute/default/",
    "host": false,
    "port": 3000,
    "assets": "_astro"
};

const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { pageMap };
