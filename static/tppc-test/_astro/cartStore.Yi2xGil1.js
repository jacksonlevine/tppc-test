import{p as $}from"./index.B-gUmfTx.js";import{a as A}from"./index.B9Lqsz3r.js";import{c as P}from"./index.BfFOJjEX.js";/*! js-cookie v3.0.5 | MIT */function f(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var a in r)t[a]=r[a]}return t}var _={read:function(t){return t[0]==='"'&&(t=t.slice(1,-1)),t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(t){return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function y(t,e){function r(n,i,o){if(!(typeof document>"u")){o=f({},e,o),typeof o.expires=="number"&&(o.expires=new Date(Date.now()+o.expires*864e5)),o.expires&&(o.expires=o.expires.toUTCString()),n=encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var s in o)o[s]&&(c+="; "+s,o[s]!==!0&&(c+="="+o[s].split(";")[0]));return document.cookie=n+"="+t.write(i,n)+c}}function a(n){if(!(typeof document>"u"||arguments.length&&!n)){for(var i=document.cookie?document.cookie.split("; "):[],o={},c=0;c<i.length;c++){var s=i[c].split("="),S=s.slice(1).join("=");try{var I=decodeURIComponent(s[0]);if(o[I]=t.read(S,I),n===I)break}catch{}}return n?o[n]:o}}return Object.create({set:r,get:a,remove:function(n,i){r(n,"",f({},i,{expires:-1}))},withAttributes:function(n){return y(this.converter,f({},this.attributes,n))},withConverter:function(n){return y(f({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(t)}})}var u=y(_,{path:"/"});const E=(t,e)=>t.startsWith(e)?t:`${e}${t}`;function G({amount:t,currencyCode:e}){const r=Number(t);return Number.isFinite(r)?new Intl.NumberFormat(void 0,{style:"currency",currency:e}).format(r):`${e} ${t}`}const T=`
  fragment image on Image {
    url
    altText
    width
    height
  }
`,F=`
  fragment seo on SEO {
    description
    title
  }
`,h=`
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
    vendor
    collections(first: 100) {
      nodes {
        title
        products(first: 100) {
          edges {
            node {
              title
              vendor
            }
          }
        }
      }
    }
  }
  ${T}
  ${F}
`,m=`
  fragment cart on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                ...product
              }
            }
          }
        }
      }
    }
    totalQuantity
  }
  ${h}
`,R=`
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${m}
`,D=`
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${m}
`,U=`
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${m}
`,b=`
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${m}
`,L=`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${m}
`,x=`
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${h}
`,N="/api/2025-10/graphql.json",W="Default Title",Z="https://shopify.com/79577186540/account/customer/api/2025-10/graphql";async function d({headers:t,query:e,variables:r,env:a}){try{const i=`${a.PUBLIC_SHOPIFY_STORE_DOMAIN?E(a.PUBLIC_SHOPIFY_STORE_DOMAIN,"https://"):""}${N}`,o=a.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,c=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":o,...t},body:JSON.stringify({...e&&{query:e},...r&&{variables:r}})});if(!c.ok)throw new Error(`Request failed with status ${c.status}`);const s=await c.json();if(s.errors)throw s.errors[0];return{status:c.status,body:s}}catch(n){throw n instanceof Error?n:new Error(String(n))}}const C=t=>t.edges.map(e=>e?.node),l=t=>{const e=t.cost.totalAmount.currencyCode;return{...t,cost:{...t.cost,totalTaxAmount:t.cost.totalTaxAmount??{amount:"0.0",currencyCode:e}},lines:C(t.lines)}},q=(t,e)=>C(t).map(a=>{const n=a.url.match(/.*\/(.*)\..*/)[1];return{...a,altText:a.altText||`${e} - ${n}`}}),M=(t,e=!0)=>{if(!t)return;const{images:r,variants:a,...n}=t;return{...n,images:q(r,t.title),variants:C(a)}};async function B(t){const e=await d({query:D,env:t});return l(e.body.data.cartCreate.cart)}async function H(t,e,r){const a=await d({query:R,variables:{cartId:t,lines:e},env:r});return l(a.body.data.cartLinesAdd.cart)}async function v(t,e,r){const a=await d({query:b,variables:{cartId:t,lineIds:e},env:r});return l(a.body.data.cartLinesRemove.cart)}async function j(t,e,r){const a=await d({query:U,variables:{cartId:t,lines:e},env:r});return l(a.body.data.cartLinesUpdate.cart)}async function w(t,e){const r=await d({query:L,variables:{cartId:t},env:e});if(r.body.data.cart)return l(r.body.data.cart)}async function tt(t,e){const r=await d({query:x,variables:{handle:t},env:e});return M(r.body.data.product,!1)}async function Q(t,e){let r=u.get("cartId"),a;if(r&&(a=await w(r,e)),(!r||!a)&&(a=await B(e),r=a.id,u.set("cartId",r)),!t)return"Missing product variant ID";try{await H(r,[{merchandiseId:t,quantity:1}],e)}catch{return"Error adding item to cart"}}async function k(t,e){const r=u.get("cartId");if(!r)return"Missing cart ID";try{await v(r,[t],e)}catch{return"Error removing item from cart"}}async function Y(t,e){const r=u.get("cartId");if(!r)return"Missing cart ID";const{lineId:a,variantId:n,quantity:i}=t;try{i===0&&await v(r,[a],e),await j(r,[{id:a,merchandiseId:n,quantity:i}],e)}catch{return"Error updating item quantity"}}const p={ASSETS_PREFIX:void 0,BASE_URL:"/tppc-test",DEV:!1,MODE:"production",PROD:!0,PUBLIC_SHOPIFY_CUSTOMERACCOUNTAPI_CLIENTID:"1bebf8ab-21a5-49e2-87d1-083d826e2fac",PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:"6b1998ad993e5edbe678ae7d446f66e7",PUBLIC_SHOPIFY_STORE_DOMAIN:"pureplantdev.myshopify.com",SITE:"https://main.d2o67etau3ak8h.amplifyapp.com",SSR:!1},O=$("cart",null,{encode:JSON.stringify,decode:JSON.parse}),et=P(O,t=>t?t.totalQuantity:0),V=A(!1);function rt(t){V.set(t)}async function g(){const t=u.get("cartId");if(t){const e=await w(t,p);O.set(e)}}async function at(t){try{return await Q(t,p),await g(),"Added to cart"}catch(e){throw new Error(e.message||"Failed to add to cart")}}async function nt(t){try{return await k(t,p),await g(),"Removed from cart"}catch(e){throw new Error(e.message||"Failed to remove item from cart")}}async function ot(t){try{return await Y(t,p),await g(),"Cart updated"}catch(e){throw new Error(e.message||"Failed to update cart")}}export{Z as C,W as D,at as a,g as b,V as c,O as d,G as f,tt as g,nt as r,rt as s,et as t,ot as u};
