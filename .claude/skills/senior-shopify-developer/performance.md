# Performance targets

Default targets for every storefront change, without being asked:

- Lighthouse mobile score 95+ on affected pages.
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.

## Practices

- **LCP**: the LCP element (usually hero image or first product image) must
  not lazy-load; use `fetchpriority="high"` and preload it if it's render-
  blocking-critical. Serve responsive images (`srcset`/`sizes`) at the actual
  rendered size via Shopify's `image_url` filters — never ship a 2000px image
  for a 400px slot.
- **CLS**: always reserve space for images/embeds (explicit `width`/`height`
  or `aspect-ratio`), and for web fonts use `font-display: swap` plus a
  matched fallback font to avoid layout shift on swap.
- **INP**: keep the main thread free — break up long tasks, debounce
  expensive handlers (filter re-render, search-as-you-type), avoid layout
  thrashing (batch reads then writes, don't interleave).
- **Images**: always through Shopify CDN transforms (`| image_url: width: …`),
  `loading="lazy"` on every image except the LCP candidate, modern formats
  (Shopify serves WebP/AVIF automatically via CDN — don't fight it with a
  manually forced format).
- **JS**: defer everything not needed for first paint; code-split by route/
  section so a product page doesn't load cart-drawer-only or filter-only JS
  it never touches.
- **CSS**: inline critical above-the-fold CSS for the hero/header, defer the
  rest; avoid one giant `theme.css` that blocks render for unrelated sections.
- **DOM size**: keep node count reasonable per section — deeply nested
  wrapper divs for styling hooks are a smell; use fewer, purposeful elements.
- Measure before/after with Lighthouse or WebPageTest for any change claimed
  to be a performance improvement — don't assert impact without a number.
