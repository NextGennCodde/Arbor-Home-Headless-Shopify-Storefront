# Frontend architecture

How the pieces fit together in a Shopify theme (or headless storefront):

- **Server-rendered by default.** Liquid renders the initial HTML for every
  page; JS enhances it (progressive enhancement), it doesn't replace it. A
  feature should work (degraded) with JS disabled where reasonably possible.
- **Section boundaries are component boundaries.** Each section/block owns
  its markup, its scoped styles, and its own JS (usually a custom element
  registered once, instantiated per instance) — avoid a single monolithic
  `global.js` that reaches into every section's DOM.
- **Custom elements as the JS component model** (Dawn's approach): wrap
  interactive sections in a custom element (`<product-form>`,
  `<cart-drawer>`) so lifecycle (`connectedCallback`/`disconnectedCallback`)
  handles setup/teardown automatically, including on Section-Rendering-API
  re-renders which swap the DOM out from under naive event bindings.
- **State that must survive navigation** (cart contents, recently viewed)
  lives in `localStorage`/Shopify's cart, not in-memory JS state.
- **Headless/embedded app exception**: when the actual surface is a React
  embedded admin app or a headless storefront (Hydrogen/Next.js on the
  Storefront API), use React conventions instead — component composition,
  proper state management (Redux only if the app's complexity warrants it,
  otherwise context/hooks are enough) — don't force a Liquid-theme pattern
  onto a fully headless codebase or vice versa.
- **Third-party libraries** (GSAP, Swiper) are opt-in per section that needs
  them, loaded on demand — don't bundle them globally for pages that don't
  use a carousel or scroll animation.
- Keep a clear boundary between: (1) Liquid/schema (data + markup),
  (2) CSS (presentation), (3) JS (behavior). A change to one shouldn't force
  touching the other two unless the feature genuinely spans all three.
