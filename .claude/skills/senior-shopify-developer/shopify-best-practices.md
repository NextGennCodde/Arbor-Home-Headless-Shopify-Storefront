# Shopify platform best practices

## APIs

- **Storefront API**: use for headless/custom frontends or hydrating data a
  theme section can't get from Liquid alone. Prefer it over scraping/parsing
  the DOM for data that's already structured.
- **Section Rendering API** (`?sections=id1,id2` or `?section_id=`): the
  correct way to update cart drawers, filters, and quick-view without a full
  navigation. Don't hand-roll the markup those sections already produce.
- **Ajax Cart API** (`/cart/add.js`, `/cart/change.js`, `/cart/update.js`):
  always handle the error shape (`{status, message, description}`) — a 422
  on add-to-cart (sold out, quantity rule) is common and must show a real
  error, not fail silently.
- **Cart Transform API / Cart & Checkout Extensibility**: for bundles,
  gift-wrapping, tiered pricing — don't try to fake these with line item
  properties when a Cart Transform Function is the supported mechanism.
- **Predictive Search API**: debounce input (150-300ms), cancel in-flight
  requests on new keystrokes (`AbortController`), and cache short-lived
  results per query.
- **Search & Discovery / Filters**: server-rendered filter state should stay
  in the URL (query params) so filtered views are shareable and back-button
  safe; don't manage filter state only in client JS.
- **Markets / Localization**: never hardcode currency symbols, locales, or
  country lists — use `localization.country`, `shop.enabled_currencies`, and
  `{{ 'key' | t }}` for every string a customer sees.
- **Customer accounts / B2B**: check `customer.b2b?` and company-location
  context before assuming consumer pricing/UX; B2B catalogs can have
  different variants, pricing, and payment terms.

## Theme app extensions & app blocks

- App blocks render inside a fixed injection point the merchant places via
  the Theme Editor — never assume a fixed DOM position around it.
- Namespace all CSS/JS from an app block to avoid collisding with the host
  theme (scoped class prefixes, `data-` attributes, no global var names).
- Don't mutate theme files from an app; use app blocks/embeds and the App
  Bridge, not directly edited theme code, so merchant theme updates don't
  break the integration.

## Shopify CLI / dev workflow

- Use `shopify theme dev` for local preview against a real store, not just
  static file editing — Liquid objects and metafields need real store data.
- Treat `theme.lock` (if present) and file structure as authoritative; don't
  restructure `sections/`/`snippets/` without checking what the customizer
  currently references, or existing customizer content breaks.
