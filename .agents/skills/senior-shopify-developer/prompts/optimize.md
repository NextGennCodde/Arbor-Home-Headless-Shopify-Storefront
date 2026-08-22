# Optimize mode

Goal: improve Core Web Vitals / Lighthouse score for the given
page/section/asset without changing its visible behavior.

1. Load `../performance.md`.
2. Identify current bottlenecks concretely: largest LCP candidate, layout
   shift sources, main-thread-blocking JS, render-blocking CSS, oversized
   images/fonts. Don't guess — point to the specific element/file/line.
3. Propose changes ranked by expected impact vs. effort.
4. Call out any accessibility or SEO regression risk from the proposed
   change (e.g. removing an image entirely vs. lazy-loading it).
5. State how to verify the improvement (Lighthouse run, WebPageTest,
   specific metric expected to move) — don't claim an improvement without a
   way to measure it.
