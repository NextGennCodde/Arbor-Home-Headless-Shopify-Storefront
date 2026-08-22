# Cross-cutting coding standards

- DRY across Liquid, CSS, and JS: a pattern used twice in a section belongs
  in a snippet/partial/utility, not copy-pasted.
- Separate logic from presentation: keep data-shaping (`{% assign %}`,
  `{% liquid %}` blocks) at the top of a file or in a snippet, markup below.
- Modular files: one section/snippet does one job. If a section file exceeds
  ~200-300 lines or mixes unrelated concerns, split it.
- Naming: match the repo's existing convention (Dawn uses kebab-case files,
  `data-*` attributes for JS hooks, BEM-ish class names like `card__heading`).
  Don't introduce a second naming convention into an existing theme.
- Comments: only for non-obvious *why* (platform quirks, workarounds for a
  specific Shopify API limitation, a subtle Liquid gotcha). Never restate
  what the code already says.
- No dead code, no commented-out blocks, no speculative "just in case" hooks
  or config options nobody asked for.
- Git workflow: small, reviewable commits scoped to one concern; write commit
  messages that explain why the change was made, not just what changed.
