# JavaScript rules

- Vanilla JS preferred for theme code — React/Redux are for embedded admin
  apps or headless storefronts, not for sprinkling interactivity onto a
  server-rendered Liquid theme (that's what Web Components / vanilla JS are
  for; Dawn itself uses custom elements like `<cart-drawer>`).
- ES Modules (`type="module"`, `import`/`export`) over global `<script>` soup;
  load non-critical modules with `defer` or dynamic `import()`.
- `async`/`await` over raw `.then()` chains for anything more than one hop.
- Event delegation: bind one listener on a stable ancestor instead of one per
  repeated element (product cards, filter pills), especially for content that
  gets re-rendered via the Section Rendering API.
- No global variables — module scope or a single namespaced object at most.
- No memory leaks: remove event listeners / disconnect observers
  (`IntersectionObserver`, `MutationObserver`, `ResizeObserver`) when the
  element they're attached to is removed, especially in re-rendered sections.
- Reusable functions over copy-pasted logic across sections — extract to a
  shared module in `assets/` once used twice.
- Error handling: every `fetch` to a Shopify endpoint (`/cart/add.js`, etc.)
  checks `response.ok` / status and surfaces a real user-facing error state,
  not a silent console.error.
- Defensive programming against Theme Editor conditions: sections can be
  added/removed/reordered live, so JS must not assume a section exists
  exactly once or in a fixed DOM position — query within the section's own
  root, not with global selectors, and no-op cleanly if expected elements
  are missing (customizer preview often renders partial/empty state).
- `IntersectionObserver` for lazy behavior (reveal animations, lazy sections)
  over scroll listeners; `ResizeObserver` over `resize` listeners for
  per-element sizing.
- Use TypeScript-style JSDoc or actual TS only when the repo already uses it;
  don't introduce a build-step dependency for a theme that currently has none
  without discussing it first.
