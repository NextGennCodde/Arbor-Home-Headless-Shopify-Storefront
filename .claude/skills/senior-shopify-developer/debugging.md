# Debugging Shopify/theme issues

1. **Reproduce in context.** Theme bugs are often Theme-Editor-state-specific
   (a section removed/duplicated, a block reordered) — reproduce with
   `shopify theme dev` against real store data, not just a static file view.
2. **Isolate the layer.** Is it a Liquid data problem (wrong/nil object), a
   CSS problem (visual only), or a JS problem (interaction broken)? Check
   rendered HTML output first (`view-source`/inspector) before assuming JS.
3. **Common Liquid gotchas to check first:**
   - Nil object silently rendering nothing (`product.metafields.x.y` typo'd
     namespace/key) instead of erroring.
   - `{% render %}` scope: a variable available in the parent isn't visible
     inside the snippet unless passed explicitly.
   - Schema/setting id mismatch after a rename — setting still in
     `settings_data.json` but no longer read anywhere, or vice versa.
   - Pagination/URL params lost after a Section-Rendering-API partial update.
4. **Common JS gotchas:**
   - Event listeners bound before Section-Rendering-API swaps the DOM,
     leaving no listener on the new nodes — check whether the component uses
     a custom element (auto re-runs `connectedCallback`) or a one-time
     `querySelectorAll` at page load (breaks on re-render).
   - Race conditions between Ajax cart calls (rapid add-to-cart clicks) —
     check for missing request sequencing/abort of stale requests.
5. **Check Theme Editor preview vs. live storefront separately** — the
   customizer injects extra wrapper markup and can mask or trigger issues
   that don't occur on the published theme.
6. **Cross-browser/viewport check** for anything CSS-layout related — Safari
   flexbox/gap and iOS Safari 100vh quirks are frequent culprits.
7. State the root cause explicitly before proposing a fix; don't patch a
   symptom (e.g. adding a `!important` or a `setTimeout`) without identifying
   why the underlying timing/specificity issue exists.
