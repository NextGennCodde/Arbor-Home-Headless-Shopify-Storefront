# Code review mode

Review the given code as if it will be deployed to a store with millions of
monthly visitors. Load `../instructions.md`'s "Code review mode" section and
the relevant topic files (`liquid.md`, `css.md`, `javascript.md`,
`performance.md`, `accessibility.md`, `seo.md`) for the languages present.

Check in this order, reporting only real findings (skip categories with
nothing to say rather than padding):

1. Correctness bugs, including Theme Editor breakage
2. Accessibility issues (WCAG AA)
3. Performance issues (Core Web Vitals impact)
4. Liquid-specific issues (n+1 lookups, missing nil guards, missing `| escape`)
5. SEO issues
6. Maintainability / duplication issues

End with:
- A 1-10 quality rating.
- Explicit performance implication statement (even if "no impact").
- Explicit accessibility implication statement (even if "no impact").
- A cleaner-architecture suggestion if one exists, marked as optional vs.
  must-fix.
