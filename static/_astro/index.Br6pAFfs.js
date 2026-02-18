const p=(t,e)=>t.startsWith(e)?t:`${e}${t}`;function S({amount:t,currencyCode:e}){const a=Number(t);return Number.isFinite(a)?new Intl.NumberFormat(void 0,{style:"currency",currency:e}).format(a):`${e} ${t}`}const I=`
  fragment image on Image {
    url
    altText
    width
    height
  }
`,f=`
  fragment seo on SEO {
    description
    title
  }
`,l=`
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
  ${I}
  ${f}
`,c=`
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
  ${l}
`,C=`
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${c}
`,g=`
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${c}
`,$=`
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${c}
`,h=`
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${c}
`,P=`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${c}
`,A=`
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${l}
`,b="/api/2025-10/graphql.json",T="Default Title",F="https://shopify.com/79577186540/account/customer/api/2025-10/graphql";async function o({headers:t,query:e,variables:a,env:r}){try{const m=`${r.PUBLIC_SHOPIFY_STORE_DOMAIN?p(r.PUBLIC_SHOPIFY_STORE_DOMAIN,"https://"):""}${b}`,y=r.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,i=await fetch(m,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":y,...t},body:JSON.stringify({...e&&{query:e},...a&&{variables:a}})});if(!i.ok)throw new Error(`Request failed with status ${i.status}`);const d=await i.json();if(d.errors)throw d.errors[0];return{status:i.status,body:d}}catch(n){throw n instanceof Error?n:new Error(String(n))}}const u=t=>t.edges.map(e=>e?.node),s=t=>{const e=t.cost.totalAmount.currencyCode;return{...t,cost:{...t.cost,totalTaxAmount:t.cost.totalTaxAmount??{amount:"0.0",currencyCode:e}},lines:u(t.lines)}},v=(t,e)=>u(t).map(r=>{const n=r.url.match(/.*\/(.*)\..*/)[1];return{...r,altText:r.altText||`${e} - ${n}`}}),O=(t,e=!0)=>{if(!t)return;const{images:a,variants:r,...n}=t;return{...n,images:v(a,t.title),variants:u(r)}};async function w(t){const e=await o({query:g,env:t});return s(e.body.data.cartCreate.cart)}async function _(t,e,a){const r=await o({query:C,variables:{cartId:t,lines:e},env:a});return s(r.body.data.cartLinesAdd.cart)}async function L(t,e,a){const r=await o({query:h,variables:{cartId:t,lineIds:e},env:a});return s(r.body.data.cartLinesRemove.cart)}async function E(t,e,a){const r=await o({query:$,variables:{cartId:t,lines:e},env:a});return s(r.body.data.cartLinesUpdate.cart)}async function q(t,e){const a=await o({query:P,variables:{cartId:t},env:e});if(a.body.data.cart)return s(a.body.data.cart)}async function N(t,e){const a=await o({query:A,variables:{handle:t},env:e});return O(a.body.data.product,!1)}export{F as C,T as D,q as a,_ as b,w as c,S as f,N as g,L as r,E as u};
