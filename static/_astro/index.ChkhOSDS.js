const p=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),I=t=>p(t)?t instanceof Error?!0:l(t):!1;function l(t){if(Object.prototype.toString.call(t)==="[object Error]")return!0;const e=Object.getPrototypeOf(t);return e===null?!1:l(e)}const g=(t,e)=>t.startsWith(e)?t:`${e}${t}`;function w({amount:t,currencyCode:e}){const r=Number(t);return Number.isFinite(r)?new Intl.NumberFormat(void 0,{style:"currency",currency:e}).format(r):`${e} ${t}`}const C=`
  fragment image on Image {
    url
    altText
    width
    height
  }
`,$=`
  fragment seo on SEO {
    description
    title
  }
`,m=`
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
  ${C}
  ${$}
`,s=`
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
  ${m}
`,h=`
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${s}
`,P=`
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${s}
`,A=`
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${s}
`,b=`
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${s}
`,O=`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${s}
`,S=`
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${m}
`,v="/api/2025-10/graphql.json",E="Default Title",_="https://shopify.com/79577186540/account/customer/api/2025-10/graphql";async function o({headers:t,query:e,variables:r,env:a}){try{const y=`${a.PUBLIC_SHOPIFY_STORE_DOMAIN?g(a.PUBLIC_SHOPIFY_STORE_DOMAIN,"https://"):""}${v}`,f=a.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,i=await fetch(y,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":f,...t},body:JSON.stringify({...e&&{query:e},...r&&{variables:r}})});if(!i.ok)throw new Error(`Request failed with status ${i.status}`);const u=await i.json();if(u.errors)throw u.errors[0];return{status:i.status,body:u}}catch(n){throw I(n)?{cause:n.cause?.toString()||"unknown",status:n.status||500,message:n.message,query:e}:{error:n,query:e}}}const d=t=>t.edges.map(e=>e?.node),c=t=>{const e=t.cost.totalAmount.currencyCode;return{...t,cost:{...t.cost,totalTaxAmount:t.cost.totalTaxAmount??{amount:"0.0",currencyCode:e}},lines:d(t.lines)}},T=(t,e)=>d(t).map(a=>{const n=a.url.match(/.*\/(.*)\..*/)[1];return{...a,altText:a.altText||`${e} - ${n}`}}),F=(t,e=!0)=>{if(!t)return;const{images:r,variants:a,...n}=t;return{...n,images:T(r,t.title),variants:d(a)}};async function L(t){const e=await o({query:P,env:t});return c(e.body.data.cartCreate.cart)}async function N(t,e,r){const a=await o({query:h,variables:{cartId:t,lines:e},env:r});return c(a.body.data.cartLinesAdd.cart)}async function D(t,e,r){const a=await o({query:b,variables:{cartId:t,lineIds:e},env:r});return c(a.body.data.cartLinesRemove.cart)}async function R(t,e,r){const a=await o({query:A,variables:{cartId:t,lines:e},env:r});return c(a.body.data.cartLinesUpdate.cart)}async function q(t,e){const r=await o({query:O,variables:{cartId:t},env:e});if(r.body.data.cart)return c(r.body.data.cart)}async function x(t,e){const r=await o({query:S,variables:{handle:t},env:e});return F(r.body.data.product,!1)}export{_ as C,E as D,q as a,N as b,L as c,w as f,x as g,D as r,R as u};
