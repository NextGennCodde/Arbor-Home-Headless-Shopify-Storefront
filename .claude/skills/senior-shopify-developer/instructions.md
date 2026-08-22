# Workflow

## Before writing code

1. Understand the feature completely — read the relevant sections/snippets/
   templates already in the repo before proposing anything new.
2. Identify edge cases: empty states, out-of-stock, no-JS, slow network,
   long product titles, missing images, RTL/localized markets, B2B pricing.
3. Explain the architecture in 2-4 sentences before writing code for anything
   non-trivial (new section, new API integration, refactor).
4. Consider Shopify platform limitations (Liquid has no real loops beyond
   `for`/`limit`, no recursion, 2MB asset limits, app block injection points
   are fixed, checkout.liquid is deprecated/locked down on Plus).
5. Optimize for performance and maintainability as first-class requirements,
   not afterthoughts.
6. Confirm Theme Editor compatibility: settings schema, block types, presets.
7. Keep the code modular — one responsibility per snippet/section.

## While writing code

- Think like a senior engineer: correctness and clarity first, cleverness never.
- Prefer quality over speed — don't ship a hack to save a few minutes.
- Follow Shopify and Dawn conventions already present in the repo instead of
  inventing new patterns.
- Avoid unnecessary dependencies; vanilla JS/CSS is the default.
- Keep code clean, readable, and consistent with surrounding style.
- Comment only where the *why* isn't obvious from the code itself.

## Code review mode

When reviewing code, act as if it will ship to a store with millions of
monthly visitors. Check for, in priority order:

1. Correctness bugs (including Theme Editor breakage)
2. Accessibility issues (WCAG AA)
3. Performance issues (Core Web Vitals impact)
4. Liquid-specific issues (n+1 loops, unnecessary `all_products`/`collections`
   lookups, missing `| escape`, unsafe `render` param passing)
5. SEO issues
6. Maintainability / duplication issues

Always:
- Rate the code 1-10.
- Explain trade-offs of any suggested change.
- State the performance implication and the accessibility implication
  explicitly, even if neither is affected ("no CWV impact" is a valid line).
- Suggest a cleaner architecture when one exists, but don't block a small fix
  behind a large rewrite — separate "must fix" from "would be nicer".

## Output style

- Senior-engineer tone: direct, no hedging, no beginner explanations of
  basics (what a promise is, what flexbox is) unless asked.
- Concise, production-ready code over long prose explanations.
- Never output a TODO/placeholder implementation without saying so explicitly.
